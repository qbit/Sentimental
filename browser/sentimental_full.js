;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
window.analyze = require('./lib/sentimental').analyze,
    window.negativity = require('./lib/sentimental').negativity,
    window.positivity = require('./lib/sentimental').positivity;

},{"./lib/sentimental":2}],2:[function(require,module,exports){
var neg5 = require('../wordLists/neglist.js').neg5,
    neg4 = require('../wordLists/neglist.js').neg4,
    neg3 = require('../wordLists/neglist.js').neg3,
    neg2 = require('../wordLists/neglist.js').neg2,
    neg1 = require('../wordLists/neglist.js').neg1,
    pos5 = require('../wordLists/poslist.js').pos5,
    pos4 = require('../wordLists/poslist.js').pos4,
    pos3 = require('../wordLists/poslist.js').pos3,
    pos2 = require('../wordLists/poslist.js').pos2,
    pos1 = require('../wordLists/poslist.js').pos1;


// Calculates the negative sentiment of a sentence
// -------------------------------------------------- //

function negativity (phrase) {
  var addPush = function(t, score){
    hits += score;
    words.push(t);
  };
    
  var noPunctuation = phrase.replace(/[^a-zA-Z ]+/g, ' ').replace('/ {2,}/',' '),
      tokens = noPunctuation.toLowerCase().split(" "),
      hits   = 0,
      words  = [];

  tokens.forEach(function(t) {
    if (neg5.indexOf(t) > -1) {
      addPush(t,5);
    } else if (neg4.indexOf(t) > -1) {
      addPush(t,4);
    } else if (neg3.indexOf(t) > -1) {
      addPush(t,3);
    } else if (neg2.indexOf(t) > -1) {
      addPush(t,2);
    } else if (neg1.indexOf(t) > -1) {
      addPush(t,1);
    }
  });

  return {
    score       : hits,
    comparative : hits / tokens.length,
    words       : words
  };
}


// Calculates the positive sentiment  of a sentence
// -------------------------------------------------- //

function positivity (phrase) {
	console.log('here');
  var addPush = function(t, score){
    hits += score;
    words.push(t);
  };

  var noPunctuation = phrase.replace(/[^a-zA-Z ]+/g, ' ').replace('/ {2,}/',' '),
      tokens = noPunctuation.toLowerCase().split(" "),
      hits   = 0,
      words  = [];

  tokens.forEach(function(t) {
    if (pos5.indexOf(t) > -1) {
      addPush(t,5);
    } else if (pos4.indexOf(t) > -1) {
      addPush(t,4);
    } else if (pos3.indexOf(t) > -1) {
      addPush(t,3);
    } else if (pos2.indexOf(t) > -1) {
      addPush(t,2);
    } else if (pos1.indexOf(t) > -1) {
      addPush(t,1);
    }
  });

  return {
    score : hits,
    comparative : hits / tokens.length,
    words : words
  };
}


// Calculates overall sentiment
// -------------------------------------------------- //

function analyze (phrase) {

  var pos = positivity(phrase),
      neg = negativity(phrase);

  return {
    score       : pos.score - neg.score,
    comparative : pos.comparative - neg.comparative,
    positive    : pos,
    negative    : neg
  };
}


module.exports = {
  analyze    : analyze,
  negativity : negativity,
  positivity : positivity
};

},{"../wordLists/neglist.js":3,"../wordLists/poslist.js":4}],3:[function(require,module,exports){
var neg5 = ['bastard','bastards','bitch','bitches','cock','cocksucker','cocksuckers','cunt',
'motherfucker','motherfucking','niggas','nigger','prick','slut','son-of-a-bitch','twat'];

var neg4 = ['ass','assfucking','asshole','bullshit','catastrophic','damn','damned','damnit','dick',
'dickhead','fraud','frauds','fraudster','fraudsters','fraudulence','fraudulent','fuck','fucked',
'fucker','fuckers','fuckface','fuckhead','fucking','fucktard','fuked','fuking','hell','jackass',
'jackasses','piss','pissed','rape','rapist','scumbag','shit','shithead','shrew','torture','tortured',
'tortures','torturing','whore','wtf'];

var neg3 = ['abhor','abhorred','abhorrent','abhors','abuse','abused','abuses','abusive',
'acrimonious','agonise','agonised','agonises','agonising','agonize','agonized','agonizes',
'agonizing','anger','angers','angry','anguish','anguished','apathetic','apathy','apeshit',
'arrested','assassination','assassinations','awful','bad','badass','badly','bankrupt','bankster',
'betray','betrayal','betrayed','betraying','betrays','bloody','boring','brainwashing','bribe',
'catastrophe','charged','charmless','chastise','chastised','chastises','chastising','cheat',
'cheated','cheater','cheaters','cheats','colluding','conspiracy','cover-up','crap','crime',
'criminal','criminals','crisis','cruel','cruelty','damage','damages','dead','deceit','deceitful',
'deceive','deceived','deceives','deceiving','deception','defect','defects','despair','despairing',
'despairs','desperate','desperately','despondent','destroy','destroyed','destroying','destroys',
'destruction','destructive','die','died','dipshit','dire','direful','disastrous','disgust',
'disgusted','disgusting','distrust','distrustful','doesnotwork','douche','douchebag','dreadful',
'dumb','dumbass','evil','fag','faggot','faggots','fake','fakes','faking','falsified','falsify',
'fatalities','fatality','fedup','felonies','felony','fiasco','frenzy','frightening','fud','furious',
'goddamn','greed','greenwash','greenwashing','greenwash','greenwasher','greenwashers','greenwashing',
'guilt','guilty','hate','hated','haters','hates','hating','heartbreaking','heartbroken','horrendous',
'horrible','horrific','horrified','humiliated','humiliation','hysteria','hysterical','hysterics',
'idiot','idiotic','illegal','imbecile','irate','irritate','irritated','irritating','jerk','kill',
'killed','killing','kills','liar','liars','loathe','loathed','loathes','loathing','loose','looses',
'loser','losing','loss','lost','lunatic','lunatics','mad','maddening','madly','madness','mediocrity',
'miserable','misleading','moron','murdering','murderous','nasty','nofun','notworking','nuts',
'obnoxious','outrage','outraged','panic','panicked','panics','perjury','pissing','pseudoscience',
'racism','racist','racists','rant','ranter','ranters','rants','ridiculous','scandal','scandalous',
'scandals','screwedup','selfish','selfishness','shitty','sinful','slavery','spammer','spammers',
'suck','sucks','swindle','swindles','swindling','terrible','terribly','terrified','terror',
'terrorize','terrorized','terrorizes','trauma','traumatic','treason','treasonous','ugly','victim',
'victimize','victimized','victimizes','victimizing','victims','vile','violence','violent','vitriolic',
'wanker','warning','warnings','whitewash','withdrawal','woeful','worried','worry','worrying','worse',
'worsen','worsened','worsening','worsens','worst','wrathful'];

var neg2 = ['abandon','abandoned','abandons','abducted','abduction','abductions','accident',
'accidental','accidentally','accidents','accusation','accusations','accuse','accused','accuses',
'accusing','ache','aching','admonish','admonished','afraid','aggravate','aggravated','aggravates',
'aggravating','aggression','aggressions','aggressive','aghast','alarm','alarmed','alarmist','alarmists',
'alienation','allergic','alone','animosity','annoy','annoyance','annoyed','annoying','annoys',
'antagonistic','anxiety','anxious','apocalyptic','appalled','appalling','apprehensive','arrest',
'arrests','arrogant','ashame','ashamed','awkward','bailout','bamboozle','bamboozled','bamboozles',
'ban','banned','barrier','beaten','belittle','belittled','bereave','bereaved','bereaves','bereaving',
'biased','bitter','bitterly','bizarre','blah','blame','blamed','blames','blaming','blurry','boastful',
'bore','bored','bother','bothered','bothers','bothersome','boycott','boycotted','boycotting','boycotts',
'brooding','bullied','bully','bullying','bummer','burden','burdened','burdening','burdens','careless',
'cashingin','casualty','censor','censored','censors','chagrin','chagrined','chaos','chaotic','charges',
'cheerless','childish','choke','choked','chokes','choking','clash','clueless','cocky','coerced',
'collapse','collapsed','collapses','collapsing','collision','collisions','complacent','complain',
'complained','complains','condemn','condemnation','condemned','condemns','conflict','conflicting',
'conflictive','conflicts','confuse','confused','confusing','constrained','contagion','contagions',
'contempt','contemptuous','contemptuously','contentious','contestable','controversial',
'controversially','cornered','costly','coward','cowardly','crash','crazier','craziest','crazy',
'crestfallen','cried','cries','critic','criticism','criticize','criticized','criticizes','criticizing',
'critics','crushed','crying','cynic','cynical','cynicism','danger','darkest','deadlock','death',
'debt','defeated','defenseless','deficit','degrade','degraded','degrades','dehumanize','dehumanized',
'dehumanizes','dehumanizing','deject','dejected','dejecting','dejects','demoralized','denied','denier',
'deniers','denies','denounce','denounces','deny','denying','depressed','depressing','derail',
'derailed','derails','deride','derided','derides','deriding','derision','detain','detained',
'detention','devastate','devastated','devastating','diffident','dirt','dirtier','dirtiest','dirty',
'disadvantage','disadvantaged','disappoint','disappointed','disappointing','disappointment',
'disappointments','disappoints','disaster','disasters','disbelieve','disconsolate','disconsolation',
'discontented','discord','discouraged','discredited','disdain','disgrace','disgraced','disheartened',
'dishonest','disillusioned','disinclined','disjointed','dislike','dismal','dismayed','disorder',
'disorganized','disoriented','disparage','disparaged','disparages','disparaging','displeased',
'dispute','disputed','disputes','disputing','disqualified','disquiet','disregard','disregarded',
'disregarding','disregards','disrespect','disrespected','disruption','disruptions','disruptive',
'dissatisfied','distort','distorted','distorting','distorts','distract','distracted','distraction',
'distracts','distress','distressed','distresses','distressing','disturb','disturbed','disturbing',
'disturbs','dithering','dodging','dodgy','dolorous','dontlike','doom','doomed','downcast',
'downhearted','downside','drained','dread','dreaded','dreading','dreary','droopy','drown','drowned',
'drowns','drunk','dubious','dud','dull','dumped','dupe','duped','dysfunction','eerie','eery',
'embarrass','embarrassed','embarrasses','embarrassing','embarrassment','embittered','emergency',
'enemies','enemy','ennui','enrage','enraged','enrages','enraging','enslave','enslaved','enslaves',
'envious','erroneous','error','errors','exaggerate','exaggerated','exaggerates','exaggerating',
'excluded','exhausted','expel','expelled','expelling','expels','exploit','exploited','exploiting',
'exploits','fad','fail','failed','failing','fails','failure','failures','fainthearted','fallen',
'fascist','fascists','fatigue','fatigued','fatigues','fatiguing','fear','fearful','fearing',
'fearsome','feeble','fidgety','fire','fired','firing','flop','flops','flu','flustered','fool',
'foolish','fools','foreclosure','foreclosures','forgetful','fright','frightened','frikin','frustrate',
'frustrated','frustrates','frustrating','frustration','fuming','gag','gagged','giddy','gloomy','glum',
'grave','greedy','grief','grieved','gross','gullibility','gullible','hapless','haplessness','hardship',
'harm','harmed','harmful','harming','harms','harried','harsh','harsher','harshest','haunted','havoc',
'heavyhearted','helpless','hesitant','hesitate','hindrance','hoax','homesick','hooligan','hooliganism',
'hooligans','hopeless','hopelessness','hostile','huckster','hunger','hurt','hurting','hurts',
'hypocritical','ignorance','ignorant','ignored','ill','illiteracy','illness','illnesses','impatient',
'imperfect','impotent','imprisoned','inability','inaction','inadequate','incapable','incapacitated',
'incensed','incompetence','incompetent','inconsiderate','inconvenience','inconvenient','indecisive',
'indifference','indifferent','indignant','indignation','indoctrinate','indoctrinated','indoctrinates',
'indoctrinating','ineffective','ineffectively','infected','inferior','inflamed','infringement',
'infuriate','infuriated','infuriates','infuriating','injured','injury','injustice','inquisition',
'insane','insanity','insecure','insensitive','insensitivity','insignificant','insipid','insult',
'insulted','insulting','insults','interrogated','interrupt','interrupted','interrupting',
'interruption','interrupts','intimidate','intimidated','intimidates','intimidating','intimidation',
'irresolute','itchy','jailed','jealous','jeopardy','joyless','lack','lackadaisical','lagged',
'lagging','lags','lame','lawsuit','lawsuits','lethargic','lethargy','libelous','lied','litigious',
'livid','lobby','lobbying','lonely','lonesome','lugubrious','meaningless','melancholy','menace',
'menaced','mess','messed','messingup','mindless','misbehave','misbehaved','misbehaves','misbehaving',
'misery','misgiving','misinformation','misinformed','misinterpreted','misreporting',
'misrepresentation','miss','missed','missing','mistake','mistaken','mistakes','mistaking',
'misunderstand','misunderstanding','misunderstands','misunderstood','moan','moaned','moaning',
'moans','mock','mocked','mocking','mocks','mongering','monopolize','monopolized','monopolizes',
'monopolizing','mourn','mourned','mournful','mourning','mourns','mumpish','murder','murderer',
'murders','n00b','naive','na\xc3\xafve','needy','negative','negativity','neglect','neglected',
'neglecting','neglects','nervous','nervously','nonsense','noob','nosey','notgood','notorious',
'obliterate','obliterated','obscene','obsolete','obstacle','obstacles','obstinate','odd','offend',
'offended','offender','offending','offends','oppressed','oppressive','optionless','outcry',
'outmaneuvered','overreact','overreacted','overreaction','overreacts','oversell','overselling',
'oversells','oversimplification','oversimplified','oversimplifies','oversimplify','overstatement',
'overstatements','pain','pained','pathetic','penalty','peril','perpetrator','perpetrators',
'perplexed','persecute','persecuted','persecutes','persecuting','perturbed','pesky','pessimism',
'pessimistic','petrified','phobic','pique','piqued','piteous','pity','poised','poison','poisoned',
'poisons','pollute','polluted','polluter','polluters','pollutes','poor','poorer','poorest',
'possessive','powerless','prblm','prblms','pressured','prison','prisoner','prisoners','problem',
'problems','profiteer','propaganda','prosecuted','protest','protesters','protesting','protests',
'punish','punished','punishes','punitive','puzzled','quaking','questionable','rage','rageful',
'rash','rebellion','recession','reckless','refuse','refused','refusing','regret','regretful',
'regrets','regretted','regretting','remorse','repulsed','resentful','restless','restrict',
'restricted','restricting','restriction','restricts','retard','retarded','revenge','revengeful',
'riot','riots','risk','risks','rob','robber','robed','robing','robs','ruin','ruined','ruining',
'ruins','sabotage','sad','sadden','saddened','sadly','sarcastic','scam','scams','scapegoat',
'scapegoats','scare','scared','scary','sceptical','scold','scorn','scornful','scream','screamed',
'screaming','screams','screwed','sedition','seditious','self-deluded','sentence','sentenced',
'sentences','sentencing','severe','shaky','shame','shamed','shameful','shattered','shock','shocked',
'shocking','shocks','short-sighted','short-sightedness','shortage','shortages','sick','sigh',
'singleminded','skeptic','skeptical','skepticism','skeptics','slam','slash','slashed','slashes',
'slashing','sleeplessness','sluggish','smear','smog','snub','snubbed','snubbing','snubs','somber',
'sorrow','sorrowful','spam','spamming','speculative','spiritless','spiteful','stab','stabbed',
'stabs','stall','stalled','stalling','stampede','startled','starve','starved','starves','starving',
'steal','steals','stereotype','stereotyped','stingy','stolen','strangled','stressed','stressor',
'stressors','stricken','strikers','struggle','struggled','struggles','struggling','stubborn','stuck',
'stunned','stupid','stupidly','subversive','suffer','suffering','suffers','suicidal','suicide',
'suing','sulking','sulky','sullen','suspicious','swear','swearing','swears','tard','tears','tense',
'thorny','thoughtless','threat','threaten','threatened','threatening','threatens','threats','thwart',
'thwarted','thwarting','thwarts','timid','timorous','tired','tits','toothless','torn','totalitarian',
'totalitarianism','tout','touted','touting','touts','tragedy','tragic','trapped','travesty',
'trembling','tremulous','tricked','trickery','trouble','troubled','troubles','tumor','unacceptable',
'unappreciated','unapproved','unaware','uncomfortable','unconcerned','undermine','undermined',
'undermines','undermining','undeserving','undesirable','uneasy','unemployment','unethical','unfair',
'unfocused','unfulfilled','unhappy','unhealthy','unimpressed','unintelligent','unjust','unlovable',
'unloved','unmotivated','unprofessional','unresearched','unsatisfied','unsecured','unsophisticated',
'unstable','unsupported','unwanted','unworthy','upset','upsets','upsetting','uptight','useless',
'uselessness','vague','vexation','vexing','vicious','violate','violated','violates','violating',
'virulent','vulnerability','vulnerable','walkout','walkouts','war','warfare','warn','warned','warns',
'wasted','wasting','weak','weakness','weary','weep','weeping','weird','wicked','woebegone','worthless',
'wreck','wrong','wronged','yucky','zealot','zealots'];

var neg1 = ['absentee','absentees','admit','admits','admitted','affected','afflicted','affronted',
'alas','alert','ambivalent','anti','apologise','apologised','apologises','apologising','apologize',
'apologized','apologizes','apologizing','apology','attack','attacked','attacking','attacks','avert',
'averted','averts','avoid','avoided','avoids','await','awaited','awaits','axe','axed','banish',
'battle','battles','beating','bias','blind','block','blocked','blocking','blocks','bomb','broke',
'broken','cancel','cancelled','cancelling','cancels','cancer','cautious','challenge','chilling',
'clouded','collide','collides','colliding','combat','combats','contagious','contend','contender',
'contending','corpse','cramp','crush','crushes','crushing','cry','curse','cut','cuts','cutting',
'darkness','deafening','defer','deferring','defiant','delay','delayed','demand','demanded','demanding',
'demands','demonstration','detached','difficult','dilemma','disabling','disappear','disappeared',
'disappears','discard','discarded','discarding','discards','discounted','disguise','disguised',
'disguises','disguising','dizzy','doubt','doubted','doubtful','doubting','doubts','drag','dragged',
'drags','drop','dump','dumps','emptiness','empty','envies','envy','envying','escape','escapes',
'escaping','eviction','exclude','exclusion','excuse','exempt','expose','exposed','exposes','exposing',
'falling','farce','fight','flees','forced','forget','forgotten','frantic','frowning','funeral',
'funerals','ghost','gloom','gray','grey','gun','hacked','hard','haunt','haunts','hid','hide','hides',
'hiding','ignore','ignores','immobilized','impose','imposed','imposes','imposing','inhibit','ironic',
'irony','irrational','irreversible','isolated','jumpy','lag','lazy','leak','leaked','leave','limitation',
'limited','limits','litigation','longing','loom','loomed','looming','looms','lowest','lurk','lurking',
'lurks','made-up','mandatory','manipulated','manipulating','manipulation','mischief','mischiefs',
'misread','moody','mope','moping','myth','nerves','no','noisy','numb','offline','overload','overlooked',
'overweight','oxymoron','paradox','parley','passive','passively','pay','pensive','pileup','pitied',
'postpone','postponed','postpones','postponing','poverty','pressure','pretend','pretending','pretends',
'prevent','prevented','preventing','prevents','prosecute','prosecutes','prosecution','provoke',
'provoked','provokes','provoking','pushy','questioned','questioning','rainy','reject','rejected',
'rejecting','rejects','relentless','repulse','resign','resigned','resigning','resigns','retained',
'retreat','rig','rigged','sappy','seduced','shoot','shy','silencing','silly','sneaky','solemn','sore',
'sorry','squelched','stifled','stop','stopped','stopping','stops','strange','strangely','strike',
'strikes','struck','suspect','suspected','suspecting','suspects','suspend','suspended','tension','trap',
'unbelievable','unbelieving','uncertain','unclear','unconfirmed','unconvinced','uncredited','undecided',
'underestimate','underestimated','underestimates','underestimating','unequal','unsettled','unsure',
'urgent','verdict','verdicts','vociferous','waste','wavering','widowed','worn'];


exports.neg5 = neg5;
exports.neg4 = neg4;
exports.neg3 = neg3;
exports.neg2 = neg2;
exports.neg1 = neg1;
},{}],4:[function(require,module,exports){
var pos5 = ['breathtaking','hurrah','outstanding','superb','thrilled'];

var pos4 = ['amazing','awesome','brilliant','ecstatic','euphoric','exuberant','fabulous','fantastic',
'fun','funnier','funny','godsend','heavenly','lifesaver','lmao','lmfao','masterpiece','masterpieces',
'miracle','overjoyed','rapturous','rejoice','rejoiced','rejoices','rejoicing','rofl','roflcopter',
'roflmao','rotfl','rotflmfao','rotflol','stunning','terrific','triumph','triumphant','win','winner',
'winning','wins','wonderful','wooo','woow','wow','wowow','wowww'];

var pos3 = ['admire','admired','admires','admiring','adorable','adore','adored','adores','affection',
'affectionate','amuse','amused','amusement','amusements','astound','astounded','astounding',
'astoundingly','astounds','audacious','award','awarded','awards','beatific','beauties','beautiful',
'beautifully','beautify','beloved','best','blessing','bliss','blissful','blockbuster','breakthrough',
'captivated','celebrate','celebrated','celebrates','celebrating','charm','charming','cheery','classy',
'coolstuff','dearly','delight','delighted','delighting','delights','devoted','elated','elation',
'enrapture','enthral','enthusiastic','euphoria','excellence','excellent','excite','excited',
'excitement','exciting','exhilarated','exhilarates','exhilarating','exultant','exultantly','faithful',
'fan','fascinate','fascinated','fascinates','fascinating','ftw','gallant','gallantly','gallantry',
'genial','glad','glamorous','glamourous','glee','gleeful','good','goodness','gracious','grand',
'grateful','great','greater','greatest','haha','hahaha','hahahah','happiness','happy','heartfelt',
'heroic','humerous','impress','impressed','impresses','impressive','inspiring','joy','joyful',
'joyfully','joyous','jubilant','kudos','lawl','lol','lovable','love','loved','lovelies','lovely',
'loyal','loyalty','luck','luckily','lucky','marvel','marvelous','marvels','medal','merry','mirth',
'mirthful','mirthfully','nice','ominous','once-in-a-lifetime','paradise','perfect','perfectly',
'pleasant','pleased','pleasure','popular','praise','praised','praises','praising','prosperous',
'rightdirection','rigorous','rigorously','scoop','sexy','soothe','soothed','soothing','sparkle',
'sparkles','sparkling','splendid','successful','super','vibrant','vigilant','visionary','vitality',
'vivacious','wealth','winwin','won','woo','woohoo','worshiped','yummy'];

var pos2 = ['abilities','ability','absolve','absolved','absolves','absolving','accomplish',
'accomplished','accomplishes','acquit','acquits','acquitted','acquitting','advantage','advantages',
'adventure','adventures','adventurous','agog','agreeable','amaze','amazed','amazes','ambitious',
'appease','appeased','appeases','appeasing','applaud','applauded','applauding','applauds','applause',
'appreciate','appreciated','appreciates','appreciating','appreciation','approval','approved',
'approves','asset','assets','astonished','attracting','attraction','attractions','avid','backing',
'bargain','benefit','benefits','benefitted','benefitting','better','bless','blesses','blithe',
'bold','boldly','brave','brightest','brisk','buoyant','calm','calmed','calming','calms','care',
'careful','carefully','cares','chance','chances','cheer','cheered','cheerful','cheering','cheers',
'cherish','cherished','cherishes','cherishing','chic','clarifies','clarity','clean','cleaner',
'clever','comfort','comfortable','comforting','comforts','commend','commended','commitment',
'compassionate','competent','competitive','comprehensive','conciliate','conciliated','conciliates',
'conciliating','confidence','confident','congrats','congratulate','congratulation','congratulations',
'consent','consents','consolable','convivial','courage','courageous','courteous','courtesy',
'coziness','creative','cute','daredevil','daring','dauntless','dear','debonair','dedicated',
'defender','defenders','desirable','desired','desirous','determined','eager','earnest','ease',
'effective','effectively','elegant','elegantly','empathetic','enchanted','encourage','encouraged',
'encouragement','encourages','endorse','endorsed','endorsement','endorses','energetic','enjoy',
'enjoying','enjoys','enlighten','enlightened','enlightening','enlightens','entertaining','entrusted',
'esteemed','ethical','exasperated','exclusive','exonerate','exonerated','exonerates','exonerating',
'fair','favor','favored','favorite','favorited','favorites','favors','fearless','fervent','fervid',
'festive','fine','flagship','focused','fond','fondness','fortunate','freedom','friendly','frisky',
'fulfill','fulfilled','fulfills','funky','futile','gain','gained','gaining','gains','generous','gift',
'glorious','glory','gratification','greetings','growth','ha','hail','hailed','hardier','hardy',
'healthy','heaven','help','helpful','helping','helps','hero','heroes','highlight','hilarious','honest',
'honor','honored','honoring','honour','honoured','honouring','hope','hopeful','hopefully','hopes',
'hoping','hug','hugs','humor','humorous','humour','humourous','immortal','importance','important',
'improve','improved','improvement','improves','improving','indestructible','infatuated','infatuation',
'influential','innovative','inquisitive','inspiration','inspirational','inspire','inspired','inspires',
'intact','integrity','intelligent','interested','interesting','intricate','invincible','invulnerable',
'irresistible','irresponsible','jaunty','jocular','joke','jokes','jolly','jovial','justice',
'justifiably','justified','kind','kinder','kiss','landmark','like','liked','likes','lively','loving',
'mature','meaningful','mercy','methodical','motivated','motivating','nifty','noble','novel','obsessed',
'oks','opportunities','opportunity','optimism','optimistic','outreach','pardon','pardoned','pardoning',
'pardons','passionate','peace','peaceful','peacefully','perfected','perfects','picturesque','playful',
'positive','positively','powerful','privileged','proactive','progress','prominent','proud','proudly',
'rapture','raptured','raptures','ratified','reassuring','recommend','recommended','recommends',
'redeemed','relaxed','reliant','relieved','relieving','relishing','remarkable','rescue','rescued',
'rescues','resolute','resolve','resolved','resolves','resolving','respected','responsible',
'responsive','restful','revered','revive','revives','reward','rewarded','rewarding','rewards',
'rich','robust','romance','satisfied','save','saved','secure','secured','secures','self-confident',
'serene','sincere','sincerely','sincerest','sincerity','slick','slicker','slickest','smarter',
'smartest','smile','smiled','smiles','smiling','solid','solidarity','sophisticated','spirited',
'sprightly','stable','stamina','steadfast','stimulating','stout','strength','strengthen',
'strengthened','strengthening','strengthens','strong','stronger','strongest','suave','success',
'sunshine','superior','support','supported','supportive','supports','survived','surviving','survivor',
'sweet','swift','swiftly','sympathetic','sympathy','tender','thank','thankful','thanks','thoughtful',
'tolerant','top','tops','tranquil','treasure','treasures','true','trusted','unbiased','unequaled',
'unstoppable','untarnished','useful','usefulness','vindicate','vindicated','vindicates','vindicating',
'virtuous','warmth','wealthy','welcome','welcomed','welcomes','willingness','worth','worthy','yeees',
'youthful'];

var pos1 = ['aboard','absorbed','accept','accepted','accepting','accepts','achievable','active',
'adequate','adopt','adopts','advanced','agree','agreed','agreement','agrees','alive','allow',
'anticipation','ardent','attract','attracted','attracts','authority','backed','backs','big','boost',
'boosted','boosting','boosts','bright','brightness','capable','carefree','certain','clear','cleared',
'clearly','clears','comedy','commit','commits','committed','committing','compelled','convince',
'convinced','convinces','cool','curious','decisive','desire','diamond','dream','dreams','easy',
'embrace','engage','engages','engrossed','ensure','ensuring','enterprising','entitled','expand',
'expands','exploration','explorations','extend','extends','faith','fame','feeling','fit','fitness',
'forgive','forgiving','free','fresh','god','grace','grant','granted','granting','grants','greet',
'greeted','greeting','greets','growing','guarantee','haunting','huge','immune','increase','increased',
'innovate','innovates','innovation','intense','interest','interests','intrigues','invite','inviting',
'jesus','jewel','jewels','join','keen','laugh','laughed','laughing','laughs','laughting','launched',
'legal','legally','lenient','lighthearted','matter','matters','meditative','motivate','motivation',
'natural','please','pray','praying','prays','prepared','pretty','promise','promised','promises',
'promote','promoted','promotes','promoting','prospect','prospects','protect','protected','protects',
'reach','reached','reaches','reaching','reassure','reassured','reassures','relieve','relieves',
'restore','restored','restores','restoring','safe','safely','safety','salient','share','shared',
'shares','significance','significant','smart','sobering','solution','solutions','solve','solved',
'solves','solving','spark','spirit','stimulate','stimulated','stimulates','straight','substantial',
'substantially','supporter','supporters','supporting','trust','unified','united','unmatched',
'validate','validated','validates','validating','vested','vision','visioning','visions','vitamin',
'want','warm','whimsical','wish','wishes','wishing','yeah','yearning','yes'];


exports.pos5 = pos5;
exports.pos4 = pos4;
exports.pos3 = pos3;
exports.pos2 = pos2;
exports.pos1 = pos1;
},{}]},{},[1])
;