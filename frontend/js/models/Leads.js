class Leads {

    addLead(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();
		
			xhr.open('POST', 'http://localhost:8000/api/leadInfo', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
		
			xhr.onload = () => {
				resolve(JSON.parse(xhr.response));
			};
			
			xhr.send(JSON.stringify(id));
		});
	}
	
	getLead(id) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();
			
			xhr.open('GET', `http://localhost:8000/api/leadInfo/${id}`, true);
			
			xhr.onload = () => {
				resolve(JSON.parse(xhr.response));
			};
			
			xhr.send();
		});
	}

	editLead(updatedLead) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('PUT', `http://localhost:8000/api/leadInfo/${updatedLead.id}`, true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => {
				resolve();
			};

			xhr.send(JSON.stringify(updatedLead));
		});
	}

	sendMsg(lead) {

			const xhr = new XMLHttpRequest();

			xhr.open('PUT', `http://localhost:8000/api/leadInfo/${lead.id}/sendStatusMsg`, true);
			xhr.setRequestHeader('Content-Type', 'application/html');

        xhr.onload = () => {
            if (xhr.status !== 204) {
                console.log( xhr.status + ': ' + xhr.statusText );
            } else {
                console.log( 'message send' );
            }
        };
			xhr.send();

	}
}

export default Leads;