import { ge, get } from "./utils.js";

const radioUUID = ge('radio-uuid');
const nameBox = ge('name-box');
const cache = JSON.parse(localStorage.getItem('cache')) || {};

function updateForm(e) {
  ge('name-label').innerHTML = (e.target == radioUUID) ? 'UUID' : 'Username';
  nameBox.placeholder = (e.target == radioUUID) ? '00000000-0000-0000-000000000000' : 'Username';
  nameBox.disabled = false;
}

async function main(e) {
  e.preventDefault();
  const query = e.target[3].value;
  const testRes = `${(e.target[1].checked) ? 1 : 0}${((uuid) => { return (uuid.length != 32 || uuid[12] != 4 || (uuid[16] != 8 && uuid[16] != 9 && uuid[16] != 'a' && uuid[16] != 'A' && uuid[16] != 'b' && uuid[16] != 'B')) ? 0 : 1 })(query.replace(/-/g, '').split(''))}${(e.target[2].checked) ? 1 : 0}${(query.length > 16) ? 0 : 1}`;
  let res;
  switch (testRes) {
    case ('1111'): res = 0; break; // [1, 1, 1, 1] => 0
    case ('1110'): res = 5; break; // [1, 1, 1, 0] => 5
    case ('1100'): res = 5; break; // [1, 1, 0, 0] => 5
    case ('1101'): res = 5; break; // [1, 1, 0, 1] => 5
    case ('1001'): res = 2; break; // [1, 0, 0, 1] => 2
    case ('1011'): res = 5; break; // [1, 0, 1, 1] => 5
    case ('1010'): res = 0; break; // [1, 0, 1, 0] => 0
    case ('1000'): res = 3; break; // [1, 0, 0, 0] => 3
    case ('0000'): res = 0; break; // [0, 0, 0, 0] => 0
    case ('0001'): res = 2; break; // [0, 0, 0, 1] => 2
    case ('0101'): res = 0; break; // [0, 1, 0, 1] => 0
    case ('0100'): res = 1; break; // [0, 1, 0, 0] => 1
    case ('0110'): res = 1; break; // [0, 1, 1, 0] => 1
    case ('0111'): res = 5; break; // [0, 1, 1, 1] => 5
    case ('0011'): res = 5; break; // [0, 0, 1, 1] => 5
    case ('0010'): res = 4; break; // [0, 0, 1, 0] => 4
  }

  if (res < 5) {
    let msg;
    switch (res) {
      case (0): msg = 'Please select either UUID or Username to proceed.'; break;
      case (1): msg = 'What you entered looks like a UUID. Did you mean to use that?'; break;
      case (2): msg = 'What you entered looks like a username. Did you mean to use that?'; break;
      case (3): msg = 'The entered UUID is invalid.'; break;
      case (4): msg = 'The entered username is invalid.'; break;
    }
    alert(msg);
    return;
  }

  let data = null;
  if (cache[`${query}`] != null) { data = cache[`${query}`]; }

  else {
    data = await getData(`https://playerdb.co/api/player/minecraft/${query}`);
    console.log(data)
    if (!data.success) { alert(`Couldn't find anyone with that ${(res == 5) ? 'UUID' : 'username'}.`); return; }
    data = data.data.player
    cache[`${data.id}`] = data;
  }

  localStorage.setItem('cache', JSON.stringify(cache));
  window.location.href = `./?show=${data.id}`
}

async function getData(url) { try { return await get(url) } catch (e) { return await e } }

radioUUID.addEventListener('click', (e) => { updateForm(e) });
ge('radio-username').addEventListener('click', (e) => { updateForm(e) });
ge('form').addEventListener('submit', main);

/*

'6 Username'                                           6 uuid                    
'5 UUID'                                               5 name                    
'4 The entered username is invalid.'                   4 bad uuid                
'3 The entered UUID is invalid.'                       3 bad name                
'2 What you entered looks like a username. Use that?'  2 did you mean uuid?      
'1 What you entered looks like a UUID. Use that?'      1 did you mean username?  
'0 Please select either UUID or Username to proceed.'  0 invalid                 

> 0 please select                                      0; please select          
> 5 uuid                                               6; uuid                   
> 5 uuid                                               6; uuid                   
> 5 uuid                                               6; uuid                   
> 6 name                                               1; looks like name        
> 0 please select                                      0; please select          
> 2 looks like name                                    1; looks like name        
> 3 bad uuid                                           4; bad uuid               
> 6 name                                               5; name                   
> 1 looks like uuid                                    2; looks like uuid        
> 0 please select                                      0; please select          
> 1 looks like uuid                                    2; looks like uuid        
> 6 name                                               5; name                   
> 4 bad name                                           3; bad name               
> 2 looks like name                                    1; looks like name        
> 0 please select                                      0; please select          

*/
