import { NavLink } from "react-router";
import "./home.css"

function Home () {
    return (
        <>
            <header>
                <div className="title">
                <div className="container">
                    <div className="eyebrow">Nightraven hivatalos eventje</div>
                    <h1>Mastering<br />the <em>Terrifier</em></h1>
                    <p className="italic">Legyen a tied Nightraven új kedvenc build-je!</p>
                    <NavLink to="/jelentkezes" end><button>Jelentkezés</button></NavLink>
                </div>
                </div>
                <div className="logo">
                <div className="container">
                    <img src="terrifier.png" />
                </div>
                </div>
            </header>
            <div className="divider"></div>
            <main>
                <section className="aversenymenete">
                <h2>Az event menete</h2>
                <div className="container">
                    <p><img src="/icons/terrifier_icon.png" /><span> A versenyzők build-eket küldenek nekem az újonnan megjelent gyilkoshoz, <em>Terrifierhez</em>. <span className="italic">(4 perk + 2 add-on)</span></span></p>
                    <p><img src="/icons/hook_icon.png" /><span> Utána <em>4 fős csapatok</em>ban játszanak ellenem. A csapatok teljesen randomizálva lesznek.</span></p>
                    <p><img src="/icons/build_icon.png" /><span> Minden játékos <em>4 meccs</em>et fog játszani, és <em>mindegyik körben másik build</em>-et fogok kipróbálni</span></p>
                    <p><img src="/icons/prize_icon.png" /><span> Én és deRez a meccsek alapján fogjuk kiválasztani a személyes kedvencünket, és azt a játékost fix <em>DLC nyereménnyel jutalmazzuk</em>.</span></p>
                    <p><img src="/icons/discord_icon.png" /><span> A <em>survivorok lehetnek voiceon</em> de egyáltalán nem kötelező ők is úgy játszanak ahogy szeretnének.</span></p>
                    <p className="eyebrow"><img src="/icons/gift_icon.png" /><span><em>Az event alatt mindvégig pörögni fognak az Art The Clown giveawayek discordon és twitchen is.</em></span></p>
                </div>
                </section>
                <div className="divider"></div>
                <section className="jelentkezes">
                <NavLink to="/jelentkezes" end><button>JELENTKEZZ MOST!</button></NavLink>
                </section>
                <div className="divider"></div>
            </main>
        </>
    )
}

export default Home