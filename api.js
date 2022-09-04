const iframe = document.querySelector('.iframe__container iframe');
console.log(iframe)
const bandSection = document.querySelector('.mtb__tiles');
const setListElement = document.querySelector('.the__list')
const gigList = document.querySelector('.gigs__list');
let members, setList, gigs

async function getApiRef(){
    const entryUrl = 'https://replicateband.prismic.io/api/v2';
    let data = await fetch(entryUrl);
    let res = await data.json();
    let ref = res.refs.filter(ref => ref.id = 'master')[0].ref;
    console.log(ref)
    callApi(ref);
    
}

async function callApi(ref){
    let data = await fetch(`https://replicateband.prismic.io/api/v2/documents/search?ref=${ref}`)
    let res = await(data.json())
    
    iframe.src = `https://www.youtube.com/embed/${res.results.filter(result => result.type == 'homepage_video')[0].data.youtube_embed[0].text}` 
    // iframeContainer.innerHTML = iframe;
    members = res.results.filter(result => result.type == 'band_member');
    setList = res.results.filter(result => result.type == 'setlist')[0].data.setlist;
    gigs = res.results.filter(result => result.type == 'gig')
    
    createMembers(members);
    addSetlist(setList);
    addGigs(gigs)
}

function createMembers(members){
    members.forEach(member => {
        let tile = document.createElement('div');
        tile.className = 'mtb__tile';

        let imageDiv = document.createElement('div');
        imageDiv.className = 'img__div';

        // imageDiv.style.backgroundImage = `url(${member.data.photo.url})`

        let image = document.createElement('img');
        image.src = member.data.photo.url;

        imageDiv.appendChild(image);

        let bio = document.createElement('div');
        bio.className = 'bio';

        let name = document.createElement('h3');
        name.innerText = member.data.name[0].text;

        let instrument = document.createElement('h5');
        instrument.innerText = member.data.instrument[0].text;
        instrument.className = 'red';

        let bioText = document.createElement('p');
        bioText.innerText = member.data.bio[0].text;

        bio.append(name, instrument, bioText)

        tile.append(imageDiv, bio)

        bandSection.appendChild(tile)
    })
}


function addSetlist(setList){
    setList.forEach(song => {
        let li = document.createElement('li');
        li.innerText = song.text;
        setListElement.appendChild(li)
    })
}

function addZero(num){
    return num < 10 ? `0${num}` : num;
}

function addGigs(gigs){
    gigs.forEach(gig => {

        let gigDiv = document.createElement('div');
        gigDiv.className = 'gig';

        let venueDiv = document.createElement('div');
        venueDiv.innerText = gig.data.venue[0].text;
    
        let dateDiv = document.createElement('div');
        dateDiv.innerText = `${gig.data.date.slice(8,10)}/${gig.data.date.slice(5,7)}/${gig.data.date.slice(0,4)}`;
    
        let eventTypeDiv = document.createElement('div');
        eventTypeDiv.innerText = gig.data.type[0].text;
    
        gigDiv.append(venueDiv, dateDiv, eventTypeDiv);
        gigList.appendChild(gigDiv)
    })
}
export{
    getApiRef
}