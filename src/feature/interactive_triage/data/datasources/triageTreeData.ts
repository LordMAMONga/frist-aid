import type { TriageNode } from "../../domain/entities/TriageEntity";

export const triageTree: Record<string, TriageNode> = {
  // === ШАГ 1: ОПАСНОСТЬ (DANGER) ===
  start: {
    id: "start",
    question: {
      ru: "Безопасно ли подходить к человеку (нет огня, оборванных проводов, газа)?",
      ky: "Адамга жакындоо коопсузбу (от, үзүлгөн зымдар, газ жокпу)?",
    },
    yesNextNodeId: "check_consciousness",
    noNextNodeId: "result_electric_shock",
  },

  // === ШАГ 2: СОЗНАНИЕ (RESPONSE) ===
  check_consciousness: {
    id: "check_consciousness",
    question: {
      ru: "Человек в сознании (отвечает на голос или касание)?",
      ky: "Адам эсиндеби (үнүңүзгө/тийгениңизге жооп береби)?",
    },
    yesNextNodeId: "check_massive_bleeding",
    noNextNodeId: "check_breathing",
  },

  // === ВЕТКА 1: БЕЗ СОЗНАНИЯ ===
  check_breathing: {
    id: "check_breathing",
    question: {
      ru: "Положите руку на грудь/послушайте. Он нормально дышит?",
      ky: "Колуңузду көкүрөгүнө коюңуз. Ал нормалдуу дем алып жатабы?",
    },
    yesNextNodeId: "check_seizure",
    noNextNodeId: "result_cpr",
  },
  check_seizure: {
    id: "check_seizure",
    question: {
      ru: "Его трясет, есть ли сильные судороги или пена изо рта?",
      ky: "Калтырап, катуу талма же оозунан көбүк чыгып жатабы?",
    },
    yesNextNodeId: "result_seizures",
    noNextNodeId: "check_trauma_unconscious",
  },
  check_trauma_unconscious: {
    id: "check_trauma_unconscious",
    question: {
      ru: "Он упал с высоты или попал в аварию перед потерей сознания?",
      ky: "Эс-учун жоготконго чейин бийиктиктен кулады беле же аварияга кабылды беле?",
    },
    yesNextNodeId: "result_spinal_injury",
    noNextNodeId: "result_fainting",
  },

  // === ВЕТКА 2: В СОЗНАНИИ ===

  // Кровотечения
  check_massive_bleeding: {
    id: "check_massive_bleeding",
    question: {
      ru: "Есть ли сильное кровотечение (кровь бьет струей или быстро вытекает)?",
      ky: "Катуу кан кетип жатабы (кан атырылып же тез агып чыгып жатабы)?",
    },
    yesNextNodeId: "check_amputation",
    noNextNodeId: "check_choking",
  },
  check_amputation: {
    id: "check_amputation",
    question: {
      ru: "Оторвана часть тела (палец, конечность)?",
      ky: "Дене мүчөсү (манжа, кол-бут) үзүлүп калганбы?",
    },
    yesNextNodeId: "result_amputation",
    noNextNodeId: "result_bleeding",
  },

  // Дыхательные пути и аллергии
  check_choking: {
    id: "check_choking",
    question: {
      ru: "Человек держится за горло, не может дышать или кашлять?",
      ky: "Адам тамагын кармап, дем ала албай же жөтөлө албай жатабы?",
    },
    yesNextNodeId: "result_choking",
    noNextNodeId: "check_anaphylaxis",
  },
  check_anaphylaxis: {
    id: "check_anaphylaxis",
    question: {
      ru: "Есть ли отек лица, губ, сыпь или резкое удушье после еды/укуса?",
      ky: "Тамактан же чаккандан кийин беттин, эриндин шишиши, бөрү жатыш же кескин муунуу барбы?",
    },
    yesNextNodeId: "result_anaphylaxis",
    noNextNodeId: "check_breathing_difficulty",
  },
  check_breathing_difficulty: {
    id: "check_breathing_difficulty",
    question: {
      ru: "Есть ли свистящее дыхание и острая нехватка воздуха (астма)?",
      ky: "Ышкырык менен дем алуу жана абанын кескин жетпеси барбы (астма)?",
    },
    yesNextNodeId: "result_asthma",
    noNextNodeId: "check_heart",
  },

  // Сердце и мозг
  check_heart: {
    id: "check_heart",
    question: {
      ru: "Жалуется на резкую, сдавливающую боль в груди, отдающую в руку?",
      ky: "Көкүрөгүндө колго берилген катуу, кысылган ооруга даттанып жатабы?",
    },
    yesNextNodeId: "result_heart_attack",
    noNextNodeId: "check_stroke",
  },
  check_stroke: {
    id: "check_stroke",
    question: {
      ru: "Лицо перекошено, речь невнятная, или он не может поднять одну руку?",
      ky: "Бети кыйшайып, сүйлөөсү түшүнүксүз же бир колун көтөрө албай жатабы?",
    },
    yesNextNodeId: "result_stroke",
    noNextNodeId: "check_trauma",
  },

  // Механические травмы
  check_trauma: {
    id: "check_trauma",
    question: {
      ru: "Была ли травма: падение, сильный удар, ДТП?",
      ky: "Травма болдубу: кулоо, катуу сокку, жол кырсыгы?",
    },
    yesNextNodeId: "check_head_spine",
    noNextNodeId: "check_poison_env",
  },
  check_head_spine: {
    id: "check_head_spine",
    question: {
      ru: "Травма пришлась на голову или позвоночник/спину?",
      ky: "Жаракат башка же омурткага/белге тийдиби?",
    },
    yesNextNodeId: "check_head_specifically",
    noNextNodeId: "check_crush",
  },
  check_head_specifically: {
    id: "check_head_specifically",
    question: {
      ru: "Был сильный удар по голове, есть тошнота или потеря памяти?",
      ky: "Башка катуу сокку тийдиби, кусуу же эс тутумдун жоголушу барбы?",
    },
    yesNextNodeId: "result_concussion",
    noNextNodeId: "result_spinal_injury",
  },
  check_crush: {
    id: "check_crush",
    question: {
      ru: "Человек придавлен тяжелым предметом (завал, машина)?",
      ky: "Адам оор нерсенин (уранды, унаа) астында кысылып калганбы?",
    },
    yesNextNodeId: "result_crush_syndrome",
    noNextNodeId: "check_fracture",
  },
  check_fracture: {
    id: "check_fracture",
    question: {
      ru: "Конечность неестественно вывернута или есть острая боль при движении?",
      ky: "Кол-бут табигый эмес буралып калганбы же кыймылдатканда катуу оору барбы?",
    },
    yesNextNodeId: "result_fractures",
    noNextNodeId: "result_internal_bleeding",
  },

  // Отравления и химия
  check_poison_env: {
    id: "check_poison_env",
    question: {
      ru: "Съел испорченное, надышался газом или пролил на себя химикат?",
      ky: "Бузулган тамак жедиби, газга ууландыбы же өзүнө химикат төгүп алдыбы?",
    },
    yesNextNodeId: "check_gas",
    noNextNodeId: "check_bites",
  },
  check_gas: {
    id: "check_gas",
    question: {
      ru: "Это произошло в закрытом помещении (запах газа, дым)?",
      ky: "Бул жабык бөлмөдө болдубу (газдын жыты, түтүн)?",
    },
    yesNextNodeId: "result_carbon_monoxide",
    noNextNodeId: "check_chem_burn",
  },
  check_chem_burn: {
    id: "check_chem_burn",
    question: {
      ru: "На кожу или в глаза попала кислота/щелочь?",
      ky: "Териге же көзгө кислота/щелочь тийдиби?",
    },
    yesNextNodeId: "result_chemical_burn",
    noNextNodeId: "result_poisoning",
  },

  // Укусы
  check_bites: {
    id: "check_bites",
    question: {
      ru: "Его укусили (животное, змея, насекомое)?",
      ky: "Аны тиштеди/чактыбы (жаныбар, жылан, курт-кумурска)?",
    },
    yesNextNodeId: "check_snake",
    noNextNodeId: "check_temp",
  },
  check_snake: {
    id: "check_snake",
    question: {
      ru: "Это укус змеи?",
      ky: "Бул жыландын чакканыбы?",
    },
    yesNextNodeId: "result_snake_bite",
    noNextNodeId: "check_animal",
  },
  check_animal: {
    id: "check_animal",
    question: {
      ru: "Укус собаки, кошки или дикого животного?",
      ky: "Ит, мышык же жапайы жаныбар тиштедиби?",
    },
    yesNextNodeId: "result_animal_bite",
    noNextNodeId: "check_tick",
  },
  check_tick: {
    id: "check_tick",
    question: {
      ru: "Укусил клещ?",
      ky: "Кене чактыбы?",
    },
    yesNextNodeId: "result_tick_bite",
    noNextNodeId: "result_bee_sting",
  },

  // Температурные воздействия
  check_temp: {
    id: "check_temp",
    question: {
      ru: "Произошел ожог, переохлаждение или солнечный удар?",
      ky: "Күйүк, үшүк алуу же күнгө ысып кетүү болдубу?",
    },
    yesNextNodeId: "check_fire_burn",
    noNextNodeId: "check_diabetic",
  },
  check_fire_burn: {
    id: "check_fire_burn",
    question: {
      ru: "Ожог кипятком, огнем или горячим предметом?",
      ky: "Кайнак суу, от же ысык нерседен күйдүбү?",
    },
    yesNextNodeId: "result_burns",
    noNextNodeId: "check_cold",
  },
  check_cold: {
    id: "check_cold",
    question: {
      ru: "Человек замерз на холоде (сильно дрожит, бледный)?",
      ky: "Адам сууктан үшүдүбү (катуу калтырап, кубарып турат)?",
    },
    yesNextNodeId: "check_frostbite",
    noNextNodeId: "result_heatstroke",
  },
  check_frostbite: {
    id: "check_frostbite",
    question: {
      ru: "Отдельная часть тела (пальцы, нос) побелела и потеряла чувствительность?",
      ky: "Дененин айрым бөлүгү (манжалар, мурун) агарып, сезгичтигин жоготтубу?",
    },
    yesNextNodeId: "result_frostbite",
    noNextNodeId: "result_hypothermia",
  },

  // Другие медицинские состояния
  check_diabetic: {
    id: "check_diabetic",
    question: {
      ru: "Резкая слабость, дрожь, потливость (человек диабетик)?",
      ky: "Кескин алсыздык, калтыроо, тердөө (адам диабетикпи)?",
    },
    yesNextNodeId: "result_hypoglycemia",
    noNextNodeId: "check_panic",
  },
  check_panic: {
    id: "check_panic",
    question: {
      ru: "Сильный страх, паника, нехватка воздуха без видимых причин и травм?",
      ky: "Көрүнүп турган себепсиз жана жаракатсыз катуу коркуу, паника, абанын жетпеси?",
    },
    yesNextNodeId: "result_panic_attack",
    noNextNodeId: "result_all",
  },

  // === ИТОГОВЫЕ УЗЛЫ (РЕЗУЛЬТАТЫ) ===
  result_electric_shock: {
    id: "result_electric_shock",
    question: { ru: "", ky: "" },
    resultGuideId: "electric_shock",
  },
  result_cpr: {
    id: "result_cpr",
    question: { ru: "", ky: "" },
    resultGuideId: "cpr",
  },
  result_seizures: {
    id: "result_seizures",
    question: { ru: "", ky: "" },
    resultGuideId: "seizures",
  },
  result_fainting: {
    id: "result_fainting",
    question: { ru: "", ky: "" },
    resultGuideId: "fainting",
  },
  result_spinal_injury: {
    id: "result_spinal_injury",
    question: { ru: "", ky: "" },
    resultGuideId: "spinal_injury",
  },
  result_amputation: {
    id: "result_amputation",
    question: { ru: "", ky: "" },
    resultGuideId: "amputation",
  },
  result_bleeding: {
    id: "result_bleeding",
    question: { ru: "", ky: "" },
    resultGuideId: "bleeding",
  },
  result_choking: {
    id: "result_choking",
    question: { ru: "", ky: "" },
    resultGuideId: "choking",
  },
  result_anaphylaxis: {
    id: "result_anaphylaxis",
    question: { ru: "", ky: "" },
    resultGuideId: "anaphylaxis",
  },
  result_asthma: {
    id: "result_asthma",
    question: { ru: "", ky: "" },
    resultGuideId: "asthma",
  },
  result_heart_attack: {
    id: "result_heart_attack",
    question: { ru: "", ky: "" },
    resultGuideId: "heart_attack",
  },
  result_stroke: {
    id: "result_stroke",
    question: { ru: "", ky: "" },
    resultGuideId: "stroke",
  },
  result_concussion: {
    id: "result_concussion",
    question: { ru: "", ky: "" },
    resultGuideId: "concussion",
  },
  result_crush_syndrome: {
    id: "result_crush_syndrome",
    question: { ru: "", ky: "" },
    resultGuideId: "crush_syndrome",
  },
  result_fractures: {
    id: "result_fractures",
    question: { ru: "", ky: "" },
    resultGuideId: "fractures",
  },
  result_internal_bleeding: {
    id: "result_internal_bleeding",
    question: { ru: "", ky: "" },
    resultGuideId: "internal_bleeding",
  },
  result_carbon_monoxide: {
    id: "result_carbon_monoxide",
    question: { ru: "", ky: "" },
    resultGuideId: "carbon_monoxide",
  },
  result_chemical_burn: {
    id: "result_chemical_burn",
    question: { ru: "", ky: "" },
    resultGuideId: "chemical_burn",
  },
  result_poisoning: {
    id: "result_poisoning",
    question: { ru: "", ky: "" },
    resultGuideId: "poisoning",
  },
  result_snake_bite: {
    id: "result_snake_bite",
    question: { ru: "", ky: "" },
    resultGuideId: "snake_bite",
  },
  result_animal_bite: {
    id: "result_animal_bite",
    question: { ru: "", ky: "" },
    resultGuideId: "animal_bite",
  },
  result_tick_bite: {
    id: "result_tick_bite",
    question: { ru: "", ky: "" },
    resultGuideId: "tick_bite",
  },
  result_bee_sting: {
    id: "result_bee_sting",
    question: { ru: "", ky: "" },
    resultGuideId: "bee_sting",
  },
  result_burns: {
    id: "result_burns",
    question: { ru: "", ky: "" },
    resultGuideId: "burns",
  },
  result_frostbite: {
    id: "result_frostbite",
    question: { ru: "", ky: "" },
    resultGuideId: "frostbite",
  },
  result_hypothermia: {
    id: "result_hypothermia",
    question: { ru: "", ky: "" },
    resultGuideId: "hypothermia",
  },
  result_heatstroke: {
    id: "result_heatstroke",
    question: { ru: "", ky: "" },
    resultGuideId: "heatstroke",
  },
  result_hypoglycemia: {
    id: "result_hypoglycemia",
    question: { ru: "", ky: "" },
    resultGuideId: "hypoglycemia",
  },
  result_panic_attack: {
    id: "result_panic_attack",
    question: { ru: "", ky: "" },
    resultGuideId: "panic_attack",
  },
  result_all: {
    id: "result_all",
    question: { ru: "", ky: "" },
    resultGuideId: "all",
  },
};
