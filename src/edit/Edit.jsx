import perks from "../db/perks.json"
import addons from "../db/addons.json"
import { useState, useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router";
import "./edit.css"


function Edit () {
    let { id } = useParams();

    const [choosenperks, setchoosenperks] = useState([null, null, null, null])
    const [choosenaddons, setchoosenaddons] = useState([null, null])
    const [perksearchmodal, setperksearchmodal] = useState(false);
    const [addonlistmodal, setaddonlistmodal] = useState(false);
    const [infomodal, setinfomodal] = useState(false);
    const [foundperks, setfoundperks] = useState([{name: 'Agitation', id: 'agitation'}, {name: 'Awakened Awareness', id: 'awakenedawareness'}, {name: 'Alien Instinct', id: 'alieninstinct'}, {name: 'All-Shaking Thunder', id: 'allshakingthunder'}, {name: "A Nurse's Calling", id: 'anursescalling'}])
    const [message, setmessage] = useState()

    const [isokay, setisokay] = useState(true)

    useEffect(() => {
        axios.get(`https://test-l7hh.onrender.com/api/forms/${id}/edit`)
        .then (res => {
            setchoosenperks(res.data.perks)
            setchoosenaddons(res.data.addons)
        })
        .catch (e => {
            setisokay(false)
            
        }) 
    }, [])

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

    const submitedit = async () => {
        console.log("alma");
        
        await axios.post(`https://test-l7hh.onrender.com/api/forms/${id}/edit`, { perks: choosenperks, addons: choosenaddons})
        .then (res => {
            setmessage({ type: "good", message: [res.data.message] })
            
        })
        .catch (e => {
            console.log(e.response.data.details);
            setmessage({ type: "bad", message: e.response.data.details })
            
        })

    }

    return (<>
    { isokay ? 
    <div className="main" id="jelentkezes">
        <div className={`page page2`}>
                <h3>Módosítsd a build-ed</h3>
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
                    <button onClick={() => setinfomodal(true)}>Addon Leírások</button>
                    <button onClick={() => {submitedit()}}>Beküldés</button>
                </div>
                { message && 
                <div className="messages">
                    {message.message.map(mess => <p className={`${message.type}`}>{mess}</p>)}
                </div> } 
            </div>
            </div>

        : <div><div className="errorlink">ÉRVÉNYTELEN LINK </div><div className="divider"></div></div>}
    </>)
}

export default Edit