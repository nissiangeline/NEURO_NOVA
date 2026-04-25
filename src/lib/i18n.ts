
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          common: {
            error: 'Error'
          },
          meta: {
            title: 'Neuro Nova',
            description: 'Your gentle cognitive companion — simple, calm, and supportive.',
          },
          nav: {
            home: 'Home',
            myths: 'Myths',
            screening: 'Screening',
            expert: 'Expert',
          },
          hero: {
            title: 'Neuro Nova',
            subtitle:
              'your gentle cognitive companion, calm and supportive.',
            cta: 'Start Your Free Screening',
          },
          stats: {
            title: 'A Global Perspective',
            subtitle:
              'Understanding the scale of dementia helps us see the importance of cognitive health.',
            stat1_title: 'Global Impact (WHO)',
            stat1_desc: 'People worldwide living with dementia.',
            stat2_title: 'Urban vs. Rural Risk',
            stat2_desc: 'Risk in urban areas compared to rural.',
            stat3_title: 'Economic Cost (WHO)',
            stat3_desc: 'Annual global cost of dementia.',
            source: 'Statistics and prevalence data sourced from the World Health Organization (WHO).',
            chart_title: 'Dementia Prevalence by Location',
            chart_desc: 'The chart below shows illustrative dementia prevalence rates for adults aged 60+.',
            chart_label_rural: 'Rural',
            chart_label_urban: 'Urban',
            chart_label_global: 'Global Avg.',
          },
          mythFact: {
            title: 'Myth vs. Fact',
            subtitle:
              "Let's clear up some common misconceptions about cognitive health. Knowledge is the first step to empowerment.",
            myth1_front: 'Myth 🚫 Dementia only affects old people.',
            myth1_back:
              'Fact ✅ It can affect younger adults too, known as early-onset dementia.',
            myth2_front: 'Myth 🚫 Memory loss is a normal part of aging.',
            myth2_back:
              'Fact ✅ While some forgetfulness can be normal, significant memory loss is not.',
            myth3_front:
              "Myth 🚫 There's nothing you can do to prevent cognitive decline.",
            myth3_back:
              'Fact ✅ Lifestyle changes like exercise, diet, and mental stimulation can help.',
            myth4_front:
              'Myth 🚫 You stop growing new brain cells when you are an adult.',
            myth4_back:
              'Fact ✅ Neurogenesis, the creation of new neurons, continues into adulthood, especially in areas related to learning and memory.',
          },
          screening: {
            title: 'Screening Tools',
            subtitle:
              'Engage with our simple, private, and insightful screening tools. These are not for diagnosis but to help you understand your cognitive patterns.',
          },
          voiceTest: {
            title: 'Voice Test',
            test_purpose: 'Assesses speech patterns, rhythm, and lexical diversity.',
            error_media_api: 'Media Devices API not supported in this browser.',
            error_mic_denied:
              'Microphone access was denied. Please enable it in your browser settings to use this feature.',
            error_analysis_failed: 'Failed to analyze audio. Please try again.',
            error_file_type: 'Invalid file type. Please upload an audio file.',
            status_analyzing: 'Analyzing...',
            button_analyze: 'Analyze',
            button_reset: 'Start Over',
            yourSummary: "Your Summary",
            analysis_title: 'Voice Analysis Complete',
            source_disclaimer: 'Comparative profiles are based on established patterns from clinical studies and AI analysis, not on a direct data comparison.',
          },
          memoryGame: {
            title: 'Memory Game',
            test_purpose: 'Assesses working memory and attention by matching pairs of cards.',
            status_idle: "Press 'Start Game' to begin.",
            status_gameover: "Game Over! Press 'Restart' to try again.",
            status_your_turn: 'Your Turn',
            status_watching: 'Watch the sequence...',
            toast_gameover_title: 'Game Over',
            toast_gameover_desc: 'You reached level {{level}}.',
            toast_levelup_title: 'Level Complete!',
            toast_levelup_desc: 'Good job! Getting ready for level {{level}}.',
            level: 'Level',
            moves: 'Moves',
            button_start: 'Start Game',
            button_restart: 'Restart',
            analysis_title: 'Memory Game Analysis'
          },
          mazeGame: {
            title: "Maze Challenge",
            test_purpose: 'Evaluates visuospatial ability, planning, and reaction time.',
            instruction: 'Use arrow keys to navigate to the green square.',
            win_message: "✅ You reached the goal in {{timeTaken}} seconds!",
            analysis_title: "Performance Analysis",
            button_start: "Start Game",
            button_restart: "Play Again"
          },
          stroopGame: {
            title: "Stroop Test",
            description: "Tests your selective attention and processing speed.",
            instruction: "Press the button that matches the INK COLOR of the word, not the word itself.",
            button_start: "Start Test",
            button_restart: "Restart Test",
            score: "Score",
            finished_message: "Test complete! You scored {{score}}/{{total}}.",
            analysis_title: "Performance Analysis",
            colors: {
              red: "Red",
              blue: "Blue",
              green: "Green",
              yellow: "Yellow",
            }
          },
          expert: {
            title: 'A word from our expert',
            name: 'Dr. Riyasath Ali Syed, MD, Radiologist',
            bio: "Dr. Syed is a leading researcher in neuro-cognitive health with over 15 years of experience. His work focuses on early detection and compassionate care, pioneering new, non-invasive screening methods. At Neuro Nova, he guides our mission to create accessible and destigmatized tools for everyone.",
          },
          footer: {
            reach_out: 'Reach out anytime 💌 We’re here for you.',
            copyright: '© {{year}} Neuro Nova. All rights reserved. This is not a medical diagnosis tool.',
            aria_email: 'Email',
            aria_call: 'Call',
            aria_chat: 'Chat',
          }
        },
      },
      hi: {
        translation: {
          common: {
            error: 'त्रुटि'
          },
          meta: {
            title: 'न्यूरो नोवा',
            description: 'आपका सौम्य संज्ञानात्मक साथी — सरल, शांत और सहायक।',
          },
          nav: {
            home: 'होम',
            myths: 'मिथक',
            screening: 'स्क्रीनिंग',
            expert: 'विशेषज्ञ',
          },
          hero: {
            title: 'न्यूरो नोवा',
            subtitle: 'आपका सौम्य संज्ञानात्मक साथी, शांत और सहायक।',
            cta: 'अपनी निःशुल्क स्क्रीनिंग शुरू करें',
          },
          stats: {
            title: 'एक वैश्विक परिप्रेक्ष्य',
            subtitle: 'डिमेंशिया के पैमाने को समझने से हमें संज्ञानात्मक स्वास्थ्य के महत्व को देखने में मदद मिलती है।',
            stat1_title: 'वैश्विक प्रभाव (WHO)',
            stat1_desc: 'दुनिया भर में डिमेंशिया के साथ रहने वाले लोग।',
            stat2_title: 'शहरी बनाम ग्रामीण जोखिम',
            stat2_desc: 'ग्रामीण की तुलना में शहरी क्षेत्रों में जोखिम।',
            stat3_title: 'आर्थिक लागत (WHO)',
            stat3_desc: 'डिमेंशिया की वार्षिक वैश्विक लागत।',
            source: 'सांख्यिकी और व्यापकता डेटा विश्व स्वास्थ्य संगठन (WHO) से प्राप्त किया गया है।',
            chart_title: 'स्थान के अनुसार डिमेंशिया व्यापकता',
            chart_desc: 'नीचे दिया गया चार्ट 60+ आयु वर्ग के वयस्कों के लिए उदाहरणात्मक डिमेंशिया व्यापकता दर दिखाता है।',
            chart_label_rural: 'ग्रामीण',
            chart_label_urban: 'शहरी',
            chart_label_global: 'वैश्विक औसत',
          },
          mythFact: {
            title: 'मिथक बनाम तथ्य',
            subtitle: 'आइए संज्ञानात्मक स्वास्थ्य के बारे में कुछ सामान्य गलत धारणाओं को दूर करें। ज्ञान सशक्तिकरण का पहला कदम है।',
            myth1_front: 'मिथक 🚫 डिमेंशिया केवल बूढ़े लोगों को प्रभावित करता है।',
            myth1_back: 'तथ्य ✅ यह युवा वयस्कों को भी प्रभावित कर सकता है, जिसे अर्ली-ऑनसेट डिमेंशिया कहा जाता है।',
            myth2_front: 'मिथक 🚫 स्मृति हानि उम्र बढ़ने का एक सामान्य हिस्सा है।',
            myth2_back: 'तथ्य ✅ जबकि कुछ भूलने की बीमारी सामान्य हो सकती है, महत्वपूर्ण स्मृति हानि नहीं है।',
            myth3_front: 'मिथक 🚫 संज्ञानात्मक गिरावट को रोकने के लिए आप कुछ नहीं कर सकते।',
            myth3_back: 'तथ्य ✅ व्यायाम, आहार और मानसिक उत्तेजना जैसी जीवनशैली में बदलाव मदद कर सकता है।',
            myth4_front: 'मिथक 🚫 वयस्क होने पर आप नई मस्तिष्क कोशिकाएं उगाना बंद कर देते हैं।',
            myth4_back: 'तथ्य ✅ न्यूरोजेनेसिस, नए न्यूरॉन्स का निर्माण, वयस्कता में भी जारी रहता है, खासकर सीखने और स्मृति से संबंधित क्षेत्रों में।',
          },
          screening: {
            title: 'स्क्रीनिंग उपकरण',
            subtitle: 'हमारे सरल, निजी और व्यावहारिक स्क्रीनिंग टूल से जुड़ें। ये निदान के लिए नहीं हैं बल्कि आपके संज्ञानात्मक पैटर्न को समझने में आपकी मदद करने के लिए हैं।',
          },
          voiceTest: {
            title: 'आवाज परीक्षण',
            test_purpose: 'भाषण पैटर्न, लय और शाब्दिक विविधता का आकलन करता है।',
            error_media_api: 'इस ब्राउज़र में मीडिया डिवाइसेस एपीआई समर्थित नहीं है।',
            error_mic_denied: 'माइक्रोफ़ोन एक्सेस से वंचित कर दिया गया था। इस सुविधा का उपयोग करने के लिए कृपया इसे अपनी ब्राउज़र सेटिंग्स में सक्षम करें।',
            error_analysis_failed: 'ऑडियो का विश्लेषण करने में विफल। कृपया पुन: प्रयास करें।',
            error_file_type: 'अमान्य फ़ाइल प्रकार। कृपया एक ऑडियो फ़ाइल अपलोड करें।',
            status_analyzing: 'विश्लेषण किया जा रहा है...',
            button_analyze: 'विश्लेषण',
            button_reset: 'फिर से शुरू करें',
            yourSummary: "आपका सारांश",
            analysis_title: 'आवाज विश्लेषण पूरा हुआ',
            source_disclaimer: 'तुलनात्मक प्रोफाइल नैदानिक अध्ययनों और एआई विश्लेषण से स्थापित पैटर्न पर आधारित हैं, प्रत्यक्ष डेटा तुलना पर नहीं।',
          },
          memoryGame: {
            title: 'स्मृति खेल',
            test_purpose: 'कार्डों के जोड़े मिलाकर कामकाजी स्मृति और ध्यान का आकलन करता है।',
            status_idle: "शुरू करने के लिए 'गेम शुरू करें' दबाएं।",
            status_gameover: "खेल खत्म! फिर से प्रयास करने के लिए 'पुनरारंभ करें' दबाएं।",
            status_your_turn: 'आपकी बारी',
            status_watching: 'अनुक्रम देखें...',
            toast_gameover_title: 'खेल खत्म',
            toast_gameover_desc: 'आप स्तर {{level}} पर पहुंच गए।',
            toast_levelup_title: 'स्तर पूरा!',
            toast_levelup_desc: 'अच्छा काम! स्तर {{level}} के लिए तैयार हो रहा है।',
            level: 'स्तर',
            moves: 'चालें',
            button_start: 'खेल शुरू करें',
            button_restart: 'पुनरारंभ करें',
            analysis_title: 'स्मृति खेल विश्लेषण'
          },
          mazeGame: {
            title: "भूलभुलैया चुनौती",
            test_purpose: 'दृశ్య-ప్రాదేశిక సామర్థ్యం, ప్రణాళిక మరియు ప్రతిచర్య సమయాన్ని మూల్యాంకనం చేస్తుంది।',
            instruction: 'हरे वर्ग तक नेविगेट करने के लिए तीर कुंजियों का उपयोग करें।',
            win_message: "✅ आप {{timeTaken}} सेकंड में लक्ष्य तक पहुँच गए!",
            analysis_title: "प्रदर्शन विश्लेषण",
            button_start: "खेल शुरू करो",
            button_restart: "फिर से खेलें"
          },
          stroopGame: {
            title: "स्ट्रूप टेस्ट",
            description: "आपके चयनात्मक ध्यान और प्रसंस्करण गति का परीक्षण करता है।",
            instruction: "शब्द का नहीं, बल्कि शब्द के स्याही के रंग से मेल खाने वाला बटन दबाएं।",
            button_start: "परीक्षण शुरू करें",
            button_restart: "परीक्षण पुनरारंभ करें",
            score: "स्कोर",
            finished_message: "परीक्षण पूरा! आपने {{total}} में से {{score}} स्कोर किया।",
            analysis_title: "प्रदर्शन विश्लेषण",
            colors: {
              red: "लाल",
              blue: "नीला",
              green: "हरा",
              yellow: "पीला",
            }
          },
          expert: {
            title: 'हमारे विशेषज्ञ से एक शब्द',
            name: 'डॉ. रियासत अली सैयद, एमडी, रेडियोलॉजिस्ट',
            bio: 'डॉ. सैयद 15 से अधिक वर्षों के अनुभव के साथ न्यूरो-संज्ञानात्मक स्वास्थ्य में एक प्रमुख शोधकर्ता हैं। उनका काम प्रारंभिक पहचान और दयालु देखभाल पर केंद्रित है, जो सभी के लिए सुलभ और कलंकित उपकरणों के निर्माण के हमारे मिशन का मार्गदर्शन करता है।',
          },
          footer: {
            reach_out: 'किसी भी समय संपर्क करें 💌 हम आपके लिए यहां हैं।',
            copyright: '© {{year}} न्यूरो नोवा। सर्वाधिकार सुरक्षित। यह एक चिकित्सा निदान उपकरण नहीं है।',
            aria_email: 'ईमेल',
            aria_call: 'कॉल',
            aria_chat: 'चैट',
          }
        },
      },
      te: {
        translation: {
          common: {
            error: 'లోపం'
          },
          meta: {
            title: 'న్యూరో నోవా',
            description: 'మీ సున్నితమైన అభిజ్ఞా సహచరుడు - సరళమైన, ప్రశాంతమైన మరియు సహాయకారి.',
          },
          nav: {
            home: 'హోమ్',
            myths: 'అపోహలు',
            screening: 'స్క్రీనింగ్',
            expert: 'నిపుణుడు',
          },
          hero: {
            title: 'న్యూరో నోవా',
            subtitle: 'మీ సున్నితమైన అభిజ్ఞా సహచరుడు, ప్రశాంతంగా మరియు సహాయకారిగా ఉంటారు.',
            cta: 'మీ ఉచిత స్క్రీనింగ్ ప్రారంభించండి',
          },
          stats: {
            title: 'ఒక ప్రపంచ దృక్పథం',
            subtitle: ' слабоумие యొక్క స్థాయిని అర్థం చేసుకోవడం అభిజ్ఞా ఆరోగ్యం యొక్క ప్రాముఖ్యతను చూడటానికి మాకు సహాయపడుతుంది.',
            stat1_title: 'ప్రపంచ ప్రభావం (WHO)',
            stat1_desc: 'ప్రపంచవ్యాప్తంగా слабоумиеతో నివసిస్తున్న ప్రజలు.',
            stat2_title: 'పట్టణ మరియు గ్రామీణ ప్రమాదం',
            stat2_desc: 'గ్రామీణ ప్రాంతాలతో పోలిస్తే పట్టణ ప్రాంతాల్లో ప్రమాదం.',
            stat3_title: 'ఆర్థిక వ్యయం (WHO)',
            stat3_desc: ' слабоумие యొక్క వార్షిక ప్రపంచ వ్యయం.',
            source: 'గణాంకాలు మరియు ప్రాబల్యం డేటా ప్రపంచ ఆరోగ్య సంస్థ (WHO) నుండి తీసుకోబడింది.',
            chart_title: 'ప్రాంతం వారీగా слабоумие ప్రాబల్యం',
            chart_desc: 'దిగువ చార్ట్ 60+ సంవత్సరాల వయస్సు గల పెద్దలకు ఉదాహరణार्थ слабоумие ప్రాబల్యం రేట్లను చూపుతుంది.',
            chart_label_rural: 'గ్రామీణ',
            chart_label_urban: 'పట్టణ',
            chart_label_global: 'ప్రపంచ సగటు',
          },
          mythFact: {
            title: 'అపోహ vs. వాస్తవం',
            subtitle: 'అభిజ్ఞా ఆరోగ్యం గురించి కొన్ని సాధారణ అపోహలను తొలగిద్దాం. జ్ఞానం సాధికారతకు మొదటి అడుగు.',
            myth1_front: 'అపోహ 🚫 слабоумие వృద్ధులను మాత్రమే ప్రభావితం చేస్తుంది.',
            myth1_back: 'వాస్తవం ✅ ఇది యువకులను కూడా ప్రభావితం చేస్తుంది, దీనిని ఎర్లీ-ఆన్‌సెట్ слабоумие అంటారు.',
            myth2_front: 'అపోహ 🚫 జ్ఞాపకశక్తి కోల్పోవడం వృద్ధాప్యంలో ఒక సాధారణ భాగం.',
            myth2_back: 'వాస్తవం ✅ కొంత మతిమరుపు సాధారణమైనప్పటికీ, గణనీయమైన జ్ఞాపకశక్తి నష్టం కాదు.',
            myth3_front: 'అపోహ 🚫 అభిజ్ఞా క్షీణతను నివారించడానికి మీరు ఏమీ చేయలేరు.',
            myth3_back: 'వాస్తవం ✅ వ్యాయామం, ఆహారం మరియు మానసిక ఉద్దీపన వంటి జీవనశైలి మార్పులు సహాయపడతాయి.',
            myth4_front: 'అపోహ 🚫 మీరు పెద్దవారైనప్పుడు కొత్త మెదడు కణాలను పెంచడం ఆపివేస్తారు.',
            myth4_back: 'వాస్తవం ✅ న్యూరోజెనిసిస్, కొత్త న్యూరాన్‌ల సృష్టి, ముఖ్యంగా అభ్యాసం మరియు జ్ఞాపకశక్తికి సంబంధించిన ప్రాంతాలలో యుక్తవయస్సులో కూడా కొనసాగుతుంది.',
          },
          screening: {
            title: 'స్క్రీనింగ్ సాధనాలు',
            subtitle: 'మా సరళమైన, ప్రైవేట్ మరియు అంతర్దృష్టిగల స్క్రీనింగ్ సాధనాలతో పాల్గొనండి. ఇవి రోగనిర్ధారణ కోసం కాదు, మీ అభిజ్ఞా నమూనాలను అర్థం చేసుకోవడంలో మీకు సహాయపడతాయి.',
          },
          voiceTest: {
            title: 'వాయిస్ టెస్ట్',
            test_purpose: 'ప్రసంగ నమూనాలు, లయ మరియు నిఘంటు వైవిధ్యాన్ని అంచనా వేస్తుంది.',
            error_media_api: 'ఈ బ్రౌజర్‌లో మీడియా పరికరాల APIకి మద్దతు లేదు.',
            error_mic_denied: 'మైక్రోఫోన్ యాక్సెస్ నిరాకరించబడింది. ఈ లక్షణాన్ని ఉపయోగించడానికి దయచేసి మీ బ్రౌజర్ సెట్టింగ్‌లలో దీన్ని ప్రారంభించండి.',
            error_analysis_failed: 'ఆడియోను విశ్లేషించడంలో విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.',
            error_file_type: 'చెల్లని ఫైల్ రకం. దయచేసి ఆడియో ఫైల్‌ను అప్‌లోడ్ చేయండి.',
            status_analyzing: 'విశ్లేషిస్తోంది...',
            button_analyze: 'విశ్లేషించు',
            button_reset: 'మళ్ళీ ప్రారంభించండి',
            yourSummary: "మీ సారాంశం",
            analysis_title: 'వాయిస్ విశ్లేషణ పూర్తయింది',
            source_disclaimer: 'పోలిక ప్రొఫైల్‌లు క్లినికల్ అధ్యయనాలు మరియు AI విశ్లేషణల నుండి स्थापित నమూనాలపై ఆధారపడి ఉంటాయి, ప్రత్యక్ష డేటా పోలికపై కాదు.',
          },
          memoryGame: {
            title: 'జ్ఞాపకశక్తి ఆట',
            test_purpose: 'కార్డుల జతలను సరిపోల్చడం ద్వారా పని జ్ఞాపకశక్తి మరియు శ్రద్ధను అంచనా వేస్తుంది.',
            status_idle: "ప్రారంభించడానికి 'ఆట ప్రారంభించు' నొక్కండి.",
            status_gameover: "ఆట ముగిసింది! మళ్లీ ప్రయత్నించడానికి 'పునఃప్రారంభించు' నొక్కండి.",
            status_your_turn: 'మీ వంతు',
            status_watching: 'క్రమాన్ని చూడండి...',
            toast_gameover_title: 'ఆట ముగిసింది',
            toast_gameover_desc: 'మీరు స్థాయి {{level}}కి చేరుకున్నారు.',
            toast_levelup_title: 'స్థాయి పూర్తయింది!',
            toast_levelup_desc: 'మంచి పని! స్థాయి {{level}} కోసం సిద్ధమవుతోంది.',
            level: 'స్థాయి',
            moves: 'ఎత్తుగడలు',
            button_start: 'ఆట ప్రారంభించు',
            button_restart: 'పునఃప్రారంభించు',
            analysis_title: 'జ్ఞాపకశక్తి ఆట విశ్లేషణ'
          },
          mazeGame: {
            title: "మేజ్ ఛాలెంజ్",
            test_purpose: 'దృశ్య-ప్రాదేశిక సామర్థ్యం, ​​ప్రణాళిక మరియు ప్రతిచర్య సమయాన్ని అంచనా వేస్తుంది.',
            instruction: 'ఆకుపచ్చ చతురస్రానికి నావిగేట్ చేయడానికి బాణం కీలను ఉపయోగించండి.',
            win_message: "✅ మీరు {{timeTaken}} సెకన్లలో లక్ష్యాన్ని చేరుకున్నారు!",
            analysis_title: "పనితీరు విశ్లేషణ",
            button_start: "ఆట ప్రారంభించు",
            button_restart: "మళ్లీ ఆడండి"
          },
          stroopGame: {
            title: "స్ట్రూప్ టెస్ట్",
            description: "మీ ఎంపిక శ్రద్ధ మరియు ప్రాసెసింగ్ వేగాన్ని పరీక్షిస్తుంది.",
            instruction: "పదం కాదు, పదం యొక్క ఇంక్ రంగుతో సరిపోయే బటన్‌ను నొక్కండి.",
            button_start: "పరీక్ష ప్రారంభించండి",
            button_restart: "పరీక్షను పునఃప్రారంభించండి",
            score: "స్కోరు",
            finished_message: "పరీక్ష పూర్తయింది! మీరు {{total}}లో {{score}} స్కోర్ చేసారు.",
            analysis_title: "పనితీరు విశ్లేషణ",
            colors: {
              red: "ఎరుపు",
              blue: "నీలం",
              green: "ఆకుపచ్చ",
              yellow: "పసుపు",
            }
          },
          expert: {
            title: 'మా నిపుణుడి నుండి ఒక మాట',
            name: 'డాక్టర్ రియాసత్ అలీ సయ్యద్, MD, రేడియాలజిస్ట్',
            bio: 'డాక్టర్ సయ్యద్ న్యూరో-కాగ్నిటివ్ హెల్త్‌లో 15 సంవత్సరాల కంటే ఎక్కువ అనుభవం ఉన్న ప్రముఖ పరిశోధకుడు. అతని పని ముందస్తుగా గుర్తించడం మరియు దయగల సంరక్షణపై దృష్టి పెడుతుంది, ప్రతి ఒక్కరికీ అందుబాటులో ఉండే మరియు అవమానరహిత సాధనాలను రూపొందించడంలో మా మిషన్‌కు మార్గనిర్దేశం చేస్తుంది.',
          },
          footer: {
            reach_out: 'ఎప్పుడైనా సంప్రదించండి 💌 మేము మీ కోసం ఇక్కడ ఉన్నాము.',
            copyright: '© {{year}} న్యూరో నోవా. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి. ఇది వైద్య నిర్ధారణ సాధనం కాదు.',
            aria_email: 'ఇమెయిల్',
            aria_call: 'కాల్',
            aria_chat: 'చాట్',
          }
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
    },
  });

export default i18n;
