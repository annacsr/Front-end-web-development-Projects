import { checkForName } from './nameChecker.js'

 function handleSubmit(event) {
    event.preventDefault();
    let formText = document.getElementById('txt').value;
     // check what text was put into the form field
    Client.checkForName(formText);
    /* Function to POST Data */
    const postData = async(url='', data={}) => {
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
            try {
                const newData = await response.json();
                console.log(newData);
                return newData;
            } catch(error) {
                console.log("error", error);
            }
    }
    postData('http://localhost:8081/addText', {text: formText}).then(res => {return res.json()})
    .then(function(data) {
    console.log(data);
    document.getElementById('text').innerHTML = 'Text: ' + formText;
    document.getElementById('agreement').innerHTML = 'Agreement: ' + data.agreement;
    document.getElementById('subjectivity').innerHTML = 'Subjectivity: ' + data.subjectivity;
   });
}




export { 
    handleSubmit,
}
