(() => {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const suffix = ['th', 'st', 'nd', 'rd'];
    const getSuffix = (i) => suffix[i[i.length - 1]] || suffix[0];
    const time = (i) => `${month[i.getUTCMonth()]} ${i.getUTCDate()}${getSuffix(i.getUTCDate() + '')}, ${i.getUTCFullYear()}`;
    const show = (i) => { for (j = 0; j < data.length; j++) { if (data[j].startsWith(i)) { return data[j].split('=')[1] } } }
    const data = window.location.href.split('?')[1].replace('%40', '@').replace('%28', '(').replace('%29', ')').replace(/(\+)/g, ' ').split('&')
    document.getElementById('results').innerHTML = `
        <p>Appointment for: ${show('first')} ${show('last')}</p>
        <p>Proxy ${show('ordinance')} on ${time(new Date(show('fecha')))} in the ${show('location')} Temple</p>
        <p>Your Phone: ${show('phone')}</p>
        <p>Your Email: <a href='mailto:${show('email')}'>${show('email')}</a></p>
    `;
})()




/* The "Functions? What are those?" version
*/

function lengthy(i) {
    for (j=0;true;j++) { 
        console.log(i[j],j)
        if ( !i[j] ) return j; 
        if (j>100) return 'AAAHHH' }
}

function split(i,k) {
    let x = []
    for (j=0,y=0;j<lengthy(i);j++) { 
        if (i[j] == k) { 
            y++ 
        } 
        else {
            x[y] = `${x[y]}${i[j]}`
        } 
        console.log( `Input: ${i}\
                    \nSplit: ${k}\
                    \nIter: ${j}\
                    \nCount: ${y}\
                    \nResult: ${x}`)
    }
    return x
}


console.log(split('hello world','w'))


function x() {
    document.getElementById('results').innerHTML=`

    <p>Appointment for: ${((j)=>{
        for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){
            if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){
                return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')
            }
        }
    })('first')} ${((j)=>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('last')}</p>
    
    <p>Proxy ${

        ((j)=>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('ordinance')

    } on ${

        `${

            ['January','February','March','April','May','June','July','August','September','October','November','December'][new Date(((j)=>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('fecha')).getMonth()]
        
        } ${
            
            `${
                new Date(((j)=>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('fecha')).getDate()+1}`}${['th','st','nd','rd'][parseInt(`${new Date(((j)=>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('fecha')).getDate()}`[`${new Date(((j)=>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('fecha')).getDate()}`.length-1])]||'th'
            
        }, ${
        
            new Date(((j)=>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('fecha')).getFullYear()
            
        }`

    } in the ${

        ((j) =>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('location')
    
    } Temple</p>
    
    <p>Your Phone: ${((j)=>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40', '@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('phone')}</p>
    
    <p>Your Email: <a href='mailto:${((j)=>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if(window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('email')}'>${((j) =>{for(i=0;i<window.location.href.split('?')[1].split('&').length;i++){if (window.location.href.split('?')[1].split('&')[i].startsWith(j)){return window.location.href.split('?')[1].split('&')[i].split('=')[1].replace('%40','@').replace('%28','(').replace('%29',')').replace(/(\+)/g,' ')}}})('email')}</a></p>`;
}
