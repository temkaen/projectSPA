const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  dataFile = 'leadInfo.json',
      app = express();

const TelegramBot = require('node-telegram-bot-api'),
		token = '739017722:AAFS1c_OWdU7nG6wzkjWFmtESqgZQwCzq94',
		bot = new TelegramBot(token, {polling: true});


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
    res.header ('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});


app.get('/api/leadInfo', (req, res) => {
	res.send(fs.readFileSync(dataFile, 'utf8'));
});

app.post('/api/leadInfo', (req, res) => {

	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8')),
		lead = req.body;

	lead.id = shortId.generate();

	data.push(lead);

	fs.writeFileSync(dataFile, JSON.stringify(data));
	
	res.send(lead);

});


app.get('/api/leadInfo/:id', (req, res) => {
	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8')),
		task = data.find(task => task.id === req.params.id);
	
	res.send(task);
});

app.put('/api/leadInfo/:id', (req, res) => {
	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8')),
		lead = data.find(lead => lead.id === req.params.id),
		updatedLead = req.body;
	
	lead.name = updatedLead.name || 'Не представился';
	lead.kstyle = updatedLead.kstyle || 'Не выбрали';
    lead.material = updatedLead.material || 'Не выбрали';
    lead.ksize = updatedLead.ksize;
    lead.kconfig = updatedLead.kconfig;
    lead.phone = updatedLead.phone || 'Не оставил';
    lead.mail = updatedLead.mail || 'Не оставил';
    lead.sendStatusMsg = false;
	
	fs.writeFileSync(dataFile, JSON.stringify(data));
	
	res.sendStatus(204);
});



app.put('/api/leadInfo/:id/sendStatusMsg', (req, res) => {
	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
	const lead = data.find(lead => lead.id === req.params.id);

	lead.sendStatusMsg = true;

	console.log('запрос прошел');
	let message = `Имя клиента: ${lead.name}  \nСтиль кухни: ${lead.kstyle} \nМатериал кухни: ${lead.material} \nКонфигурация: ${lead.kconfig} \nРазмер: ${lead.ksize} \nТелефон: ${lead.phone} \nE-mail: ${lead.mail}`;

    bot.sendMessage('-270349745', message);

	
	fs.writeFileSync(dataFile, JSON.stringify(data));
	
	res.sendStatus(204);
});

app.delete('/api/leadInfo/:id', (req, res) => {
	const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

	const updatedData = data.filter(task => task.id !== req.params.id);
	
	fs.writeFileSync(dataFile, JSON.stringify(updatedData));
	
	res.sendStatus(204);
});

app.delete('/api/leadInfo', (req, res) => {
    fs.writeFileSync(dataFile, JSON.stringify([]));
    
    res.sendStatus(204);
});

app.listen(8000, () =>  console.log('Server lime has been started...'));