import "./jelentkezes.css"
import perks from "../db/perks.json"
import addons from "../db/addons.json"

import axios from "axios"

import { useState } from "react"

function Jelentkezes () {

    const [page, setPage] = useState({ page1: true, page2: false, page3: false })
    
    const [choosenperks, setchoosenperks] = useState([null, null, null, null])
    const [choosenaddons, setchoosenaddons] = useState([null, null])
    
    const [perksearchmodal, setperksearchmodal] = useState(false)
    const [foundperks, setfoundperks] = useState([{name: 'Agitation', id: 'agitation'}, {name: 'Awakened Awareness', id: 'awakenedawareness'}, {name: 'Alien Instinct', id: 'alieninstinct'}, {name: 'All-Shaking Thunder', id: 'allshakingthunder'}, {name: "A Nurse's Calling", id: 'anursescalling'}])
    const [message, setmessage] = useState()

    const [addonlistmodal, setaddonlistmodal] = useState(false);
    
    const [infomodal, setinfomodal] = useState(false)

    const [twitchname, settwitchname] = useState('');
    const [discordname, setdiscordname] = useState('');
    const [ingamename, setingamename] = useState('');

    const [adatvedelmi, setadatvedelmi] = useState(false);
    const [versenyszabalyzat, setversenyszabalyzat] = useState(false);

    
    const submitform = async () => {  
        console.log(choosenperks);
              
        await axios.post("https://masteringtheterrifier-backend-nsea.onrender.com/api/forms", { "twitch": twitchname, discord: discordname, inGameName: ingamename, "perks": choosenperks, privacyAccepted: adatvedelmi, rulesAccepted: versenyszabalyzat, addons: choosenaddons })
        .then(res => {
            console.log(res.data.message + " " + res.data.id);
            setmessage({ type: "good", message: [res.data.message, `Az összeállított build-et az event kezdetéig módosíthatod ezen a linken (mentsd el, ha pedig elfelejtetted Nightraven el tudja küldeni):`, `https://masteringtheterrifier.onrender.com/szerkesztes/${res.data.id}`] })
        })
        .catch(e => {
            setmessage({ type: "bad", message: e.response.data.details })
            
        })
    }

    const searchperk = (input) => {
        if (!input.trim()) return [];

        const query = input.toLowerCase().trim();

        setfoundperks(perks
            .map(perk => {
                const name = perk.name.toLowerCase();

                let score = 0;

                if (name === query) score = 3;
                else if (name.startsWith(query)) score = 2;
                else if (name.includes(query)) score = 1;

                return { perk, score };
            })
            .filter(result => result.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map(result => result.perk))
    }
    
    return (<>
        <div className="main" id="jelentkezes">
            <div className={`page page1 ${page.page1 ? "" : 'dnone'}`}>
                <div className="form">
                    <h3>Jelentkezés</h3>
                    <div className="input">
                        <img src="/icons_2/twitch.png" />
                        <input type="text" placeholder="Add meg a twitch neved.." onBlur={e => settwitchname(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src="/icons_2/discord.svg" />
                        <input type="text" placeholder="Add meg a discord neved.." onBlur={e => setdiscordname(e.target.value)} />
                    </div>
                    <div className="input">
                        <img src="/icons_2/dbd.png" />

                        <input type="text" placeholder="Add meg a játékbeli neved.." onBlur={e => setingamename(e.target.value)} />
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={() => setPage({ page1: false, page2: true, page3: false })}>Következő</button>
                </div>
            </div>
            <div className={`page page2 ${page.page2 ? "" : 'dnone'}`}>
                <h3>Rakd össze a build-ed</h3>
                <div className="perks">
                    <div className="perkslot" id="perkslot1" onClick={() => setperksearchmodal({ updateIndex: 0})}>
                        {choosenperks[0] && <>
                            <img src="/perk_bg.png" alt="" />
                            <img src={`/perks/${choosenperks[0].id}.png`} alt="" />
                        </>}
                    </div>
                    <div className="perkslot" id="perkslot2" onClick={() => setperksearchmodal({ updateIndex: 1})}>
                        {choosenperks[1] && <>
                            <img src="/perk_bg.png" alt="" />
                            <img src={`/perks/${choosenperks[1].id}.png`} alt="" />
                        </>}
                    </div>
                    <div className="perkslot" id="perkslot3" onClick={() => setperksearchmodal({ updateIndex: 2})}>
                        {choosenperks[2] && <>
                            <img src="/perk_bg.png" alt="" />
                            <img src={`/perks/${choosenperks[2].id}.png`} alt="" />

                        </>}
                    </div>
                    <div className="perkslot" id="perkslot4" onClick={() => setperksearchmodal({ updateIndex: 3})}>
                        {choosenperks[3] && <>
                            <img src="/perk_bg.png" alt="" />
                            <img src={`/perks/${choosenperks[3].id}.png`} alt="" />
                        </>}
                    </div>
                </div>
                <div className="addons">
                    <div className="addonslot" id="addonslot1" onClick={() => setaddonlistmodal({ updateIndex: 0})}>
                        { choosenaddons[0] && <><img src={`/addonrarities/${choosenaddons[0].rarity}.png`} alt="" />
                        <img src={`/addons/${choosenaddons[0].id}.png`} alt="" /></> }
                    </div>
                    <div className="addonslot" id="addonslot2" onClick={() => setaddonlistmodal({ updateIndex: 1})}>
                        { choosenaddons[1] && <><img src={`/addonrarities/${choosenaddons[1].rarity}.png`} alt="" />
                        <img src={`/addons/${choosenaddons[1].id}.png`} alt="" /></> }
                    </div>
                </div>
                { perksearchmodal && 
                    <div className="searchperk ">
                        <div className="perklist">
                            {foundperks.map(p => <div className="perk" onClick={() => { setchoosenperks(prev =>
        prev.map((item, i) => i === perksearchmodal.updateIndex ? p : item)
    ); setperksearchmodal(false) }}>
                                <img src={`/perks/${p.id}.png`} />
                            </div>)}
                        </div>
                        <input type="text" id="searchperk" placeholder="kezdd el írni a perk nevét..." onInput={e => searchperk(e.target.value)} />
                    </div> }

                { addonlistmodal && 
                    <div className="chooseaddon ">
                        <div className="addonlist">
                            {addons.map(add => 
                            <div className={`addon ${add.rarity}`} onClick={() => { setchoosenaddons(prev =>
        prev.map((item, i) => i === addonlistmodal.updateIndex ? add : item)
    ); setaddonlistmodal(false) }}>
                                <img src={`/addons/${add.id}.png`} />
                            </div>)}
                        </div>
                    </div> }

                { infomodal && 
                    <div className="infomodal">
                        <div className="container">
                            {addons.map(add => 
                            <div className={`addoninfo`} onClick={() => { setchoosenaddons({...choosenaddons, [addonlistmodal]: add}); setaddonlistmodal(false) }}>
                                <div className={`${add.rarity} icon`}><img src={`/addons/${add.id}.png`} /></div>
                                <div>
                                    <p className="title">{add.name}</p>
                                <p className="description">{add.descriptiton}</p>
                                </div>
                            </div>)}
                            <button onClick={() => setinfomodal(false)}>Bezárás</button>
                        </div>
                    </div> }
                <div className="buttons">
                    <button onClick={() => setPage({ page1: true, page2: false, page3: false })}>Vissza</button>
                    <button onClick={() => setinfomodal(true)}>Addon Leírások</button>
                    <button onClick={() => setPage({ page1: false, page2: false, page3: true })}>Következő</button>
                </div>
            </div>
            <div className={`page page3 ${page.page3 ? "" : 'dnone'}`}>
                <input type="checkbox" name="adatkezelesi" id="adatkezelesi" onChange={e => setadatvedelmi(e.target.checked)}  />
                <label htmlFor=""> Elolvastam és elfogadom a Versenyszabályzatban foglalt feltételeket.</label>
                <br />
                <input type="checkbox" name="versenyszabalyzat" id="versenyszabalyzat" onChange={e => setversenyszabalyzat(e.target.checked)} />
                <label htmlFor=""> Elolvastam az Adatkezelési tájékoztatót, és hozzájárulok személyes adataim abban meghatározott célú kezeléséhez.</label>
                <div className="buttons">
                    <button onClick={() => setPage({ page1: false, page2: true, page3: false })}>Vissza</button>
                    <button onClick={submitform}>Jelentkezés elküldése</button>
                </div>
                { message && 
                <div className="messages">
                    {message.message.map(mess => <p className={`${message.type}`}>{mess}</p>)}
                </div> } 
            </div>
            
        </div>
        <div className="divider"></div>
    </>)
}

export default Jelentkezes