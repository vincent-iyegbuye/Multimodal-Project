/* Interactive four-voice comparison and selected listening moments. */
(()=>{
const stories={
p1:{label:"PARTICIPANT 01 / THREE HOMES",title:"Nigeria, Virginia, Lubbock",body:"She describes Nigeria as a first home, Virginia as a second, and Lubbock as a third. She feels welcomed at Texas Tech while keeping close ties to family elsewhere.",detail:"Classes, events and the library feel comfortable, but she says she has no family or close friends in Lubbock.",insight:"My interpretation: finding another home does not erase earlier ones.",transcript:"full-transcript-01"},
p2:{label:"PARTICIPANT 02 / DEEPER CONNECTIONS",title:"Welcomed, but not yet home",body:"He enjoys Texas Tech but has not developed the deep connections needed to consider Lubbock his second home.",detail:"Making friends was initially difficult. Hackathons, library workshops and church have helped, while family in Houston remains important.",insight:"My interpretation: a welcome is not the same as a deep attachment.",transcript:"full-transcript-02"},
p3:{label:"PARTICIPANT 03 / TIME AND FRIENDSHIP",title:"A familiar city through friends and church",body:"After several years at Texas Tech she describes friends and church as a community she enjoys, while Dallas still matters in her idea of a second home.",detail:"She advises newcomers not to rush into groups just to fit in, and describes how not driving affects where she can go.",insight:"My interpretation: spending years somewhere creates routines, but time alone does not settle what home means.",transcript:"full-transcript-03"},
p4:{label:"PARTICIPANT 04 / CULTURAL COMMUNITY",title:"The people rather than the city",body:"She separates Lubbock as a physical location from a cultural and church community that feels like home.",detail:"She discusses cultural barriers to friendships, her campus job, SWE meetings and bus transportation.",insight:"My interpretation: someone can belong in a community without feeling equally at home throughout the city.",transcript:"full-transcript-04"}};
const box=document.getElementById("place-story");
const buttons=[...document.querySelectorAll("[data-participant]")];
const el=(tag,klass,txt)=>{const n=document.createElement(tag);if(klass)n.className=klass;n.textContent=txt;return n;};
if(box){buttons.forEach(button=>button.addEventListener("click",()=>{
const d=stories[button.dataset.participant];if(!d)return;
buttons.forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
const note=el("div","home-evidence","");note.append(el("span","home-evidence-label","From the interview"),el("p","",d.detail));
const link=el("a","home-transcript-link","Read Interview "+d.transcript.slice(-2));link.href="#"+d.transcript;
box.replaceChildren(el("p","place-small",d.label),el("h3","",d.title),el("p","",d.body),note,el("p","place-interpretation",d.insight),link);
}));}
const clips=[...document.querySelectorAll("audio.excerpt-player")];
clips.forEach(audio=>{
const start=Number(audio.dataset.start||0),end=Number(audio.dataset.end||Infinity);
audio.addEventListener("loadedmetadata",()=>{if(start<audio.duration)audio.currentTime=start;});
audio.addEventListener("play",()=>{clips.forEach(other=>{if(other!==audio)other.pause()});if(audio.currentTime<start-.5||audio.currentTime>=end)audio.currentTime=start;});
audio.addEventListener("timeupdate",()=>{if(audio.currentTime>=end){audio.pause();audio.currentTime=start;}});
});
})();