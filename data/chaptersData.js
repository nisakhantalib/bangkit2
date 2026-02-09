export const chaptersData = [
  {
    id: 1,
    title: "Chapter 1: Respiration",
    icon: "🫁",
    subchapters: [
      {
        id: 1.1,
        title: "1.1 Human Respiratory System",
        content: `
# Human Respiratory System

The respiratory system is responsible for the exchange of gases between the body and the environment. It consists of the nose, pharynx, larynx, trachea, bronchi, and lungs.

## Structure of the Respiratory System

### The Nose
The nose is the main entrance for air into the respiratory system. It contains:
- **Nasal cavity**: Warms and moistens incoming air
- **Mucus membrane**: Traps dust and microorganisms
- **Cilia**: Tiny hair-like structures that sweep mucus and trapped particles

### The Pharynx and Larynx
- **Pharynx** (throat): A common passage for both air and food
- **Larynx** (voice box): Contains vocal cords for sound production
- **Epiglottis**: A flap of tissue that prevents food from entering the trachea

### The Trachea
The trachea (windpipe) is a tube reinforced with C-shaped cartilage rings that:
- Keep the airway open during breathing
- Allow flexibility when swallowing
- Are lined with ciliated epithelium

### The Bronchi and Bronchioles
The trachea divides into two bronchi (singular: bronchus), one leading to each lung. Each bronchus further divides into smaller bronchioles, creating a branching network called the bronchial tree.

### The Lungs
The lungs are the main organs of respiration:
- Located in the thoracic cavity
- Protected by the ribcage
- Each lung is divided into lobes (3 in right lung, 2 in left lung)
- Covered by pleural membranes that secrete pleural fluid

### The Alveoli
At the end of the bronchioles are tiny air sacs called alveoli (singular: alveolus). These are the sites of gas exchange:
- Extremely thin walls (one cell thick)
- Surrounded by a network of capillaries
- Large surface area for efficient gas exchange
- Moist surface for gas dissolution

## Mechanism of Breathing

Breathing involves two processes:
1. **Inhalation** (breathing in): Diaphragm contracts and moves downward, intercostal muscles contract, thoracic cavity expands, air pressure decreases, air rushes in
2. **Exhalation** (breathing out): Diaphragm relaxes and moves upward, intercostal muscles relax, thoracic cavity decreases, air pressure increases, air is expelled

## Gas Exchange

Gas exchange occurs in the alveoli through diffusion:
- **Oxygen**: Moves from alveoli → blood (high to low concentration)
- **Carbon dioxide**: Moves from blood → alveoli (high to low concentration)
- Facilitated by the thin alveolar wall and large surface area
- Hemoglobin in red blood cells carries oxygen to body cells

## Importance of Healthy Lungs

Maintaining healthy lungs is crucial for:
- Efficient oxygen supply to all body cells
- Removal of carbon dioxide (a waste product)
- Supporting cellular respiration and energy production
- Overall physical performance and well-being
        `,
        videoUrl: "https://youtu.be/ZB7uA5o0mS4?si=wfyaIkv5HxadNc0J",
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is the main function of the respiratory system?",
              options: [
                "To pump blood throughout the body",
                "To exchange gases between the body and environment",
                "To digest food and absorb nutrients",
                "To remove solid waste from the body"
              ],
              correctAnswer: 1,
              explanation: "The respiratory system's primary function is to exchange gases - bringing oxygen into the body and removing carbon dioxide. This process is essential for cellular respiration and energy production."
            },
            {
              id: 2,
              question: "Which structure prevents food from entering the trachea?",
              options: [
                "Larynx",
                "Pharynx",
                "Epiglottis",
                "Esophagus"
              ],
              correctAnswer: 2,
              explanation: "The epiglottis is a flap of tissue that covers the opening of the trachea during swallowing, directing food into the esophagus and preventing it from entering the respiratory tract."
            },
            {
              id: 3,
              question: "What makes alveoli efficient for gas exchange?",
              options: [
                "They are large and hollow",
                "They have thick walls for protection",
                "They have thin walls and large surface area",
                "They contain muscles for pumping air"
              ],
              correctAnswer: 2,
              explanation: "Alveoli are highly efficient for gas exchange because they have extremely thin walls (one cell thick) and collectively provide a large surface area. This allows for rapid diffusion of oxygen and carbon dioxide."
            }
          ]
        }
      },
      {
        id: 1.2,
        title: "1.2 Cellular Respiration",
        content: `
# Cellular Respiration

Cellular respiration is the process by which cells break down glucose and other organic molecules to release energy in the form of ATP (adenosine triphosphate).

## Types of Cellular Respiration

### Aerobic Respiration
Aerobic respiration occurs in the presence of oxygen and produces the maximum amount of energy:

**Word Equation:**
Glucose + Oxygen → Carbon dioxide + Water + Energy (ATP)

**Chemical Equation:**
C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (38 ATP)

#### Stages of Aerobic Respiration:

1. **Glycolysis** (in cytoplasm)
   - Glucose (6-carbon) breaks down into 2 pyruvate molecules (3-carbon each)
   - Produces 2 ATP and 2 NADH
   - Does not require oxygen

2. **Krebs Cycle** (in mitochondria)
   - Pyruvate is further broken down
   - Produces 2 ATP, 6 NADH, and 2 FADH₂
   - Releases CO₂ as waste

3. **Electron Transport Chain** (in mitochondria)
   - NADH and FADH₂ transfer electrons
   - Produces approximately 34 ATP
   - Requires oxygen as final electron acceptor
   - Water is formed as a byproduct

### Anaerobic Respiration
Anaerobic respiration occurs without oxygen and produces less energy:

#### In Animals (Lactic Acid Fermentation):
Glucose → Lactic acid + Energy (2 ATP)
- Occurs during intense exercise when oxygen supply is insufficient
- Causes muscle fatigue and cramps
- Requires oxygen debt to be repaid (heavy breathing after exercise)

#### In Yeast and Plants (Alcoholic Fermentation):
Glucose → Ethanol + Carbon dioxide + Energy (2 ATP)
- Used in bread making (CO₂ makes dough rise)
- Used in alcohol production (wine, beer)

## Comparison of Aerobic and Anaerobic Respiration

| Aspect | Aerobic | Anaerobic |
|--------|---------|-----------|
| Oxygen required | Yes | No |
| Location | Mitochondria & cytoplasm | Cytoplasm only |
| ATP produced | 38 ATP | 2 ATP |
| Products | CO₂ + H₂O | Lactic acid or Ethanol + CO₂ |
| Efficiency | High | Low |

## Importance of Cellular Respiration

- Provides energy (ATP) for all cellular activities
- Maintains body temperature
- Supports growth and repair
- Enables muscle contraction and movement
- Powers active transport and protein synthesis
        `,
        videoUrl: "https://youtu.be/SUPQVg1vO0Q?si=yHjMjtSN1OuAMVwJ",
        quiz: {
          questions: [
            {
              id: 1,
              question: "How many ATP molecules are produced during aerobic respiration?",
              options: [
                "2 ATP",
                "10 ATP",
                "38 ATP",
                "100 ATP"
              ],
              correctAnswer: 2,
              explanation: "Aerobic respiration produces approximately 38 ATP molecules per glucose molecule. This includes 2 ATP from glycolysis, 2 ATP from the Krebs cycle, and about 34 ATP from the electron transport chain."
            },
            {
              id: 2,
              question: "What is the product of anaerobic respiration in animal muscles?",
              options: [
                "Ethanol and carbon dioxide",
                "Lactic acid",
                "Water and oxygen",
                "Glucose"
              ],
              correctAnswer: 1,
              explanation: "During intense exercise when oxygen is insufficient, animal muscles undergo anaerobic respiration (lactic acid fermentation), producing lactic acid. This buildup of lactic acid causes muscle fatigue and cramps."
            },
            {
              id: 3,
              question: "Where does the Krebs cycle occur?",
              options: [
                "In the cytoplasm",
                "In the nucleus",
                "In the mitochondria",
                "In the cell membrane"
              ],
              correctAnswer: 2,
              explanation: "The Krebs cycle occurs in the mitochondria, specifically in the mitochondrial matrix. The mitochondria are known as the 'powerhouse of the cell' because they are the site of most ATP production."
            }
          ]
        }
      },
      {
        id: 1.3,
        title: "1.3 Respiratory Health",
        content: `
# Respiratory Health

Maintaining a healthy respiratory system is essential for overall well-being. Various factors can affect respiratory health, and understanding them helps in prevention and treatment of respiratory diseases.

## Common Respiratory Diseases

### 1. Asthma
- **Cause**: Inflammation and narrowing of airways
- **Triggers**: Allergens, cold air, exercise, stress
- **Symptoms**: Wheezing, shortness of breath, chest tightness, coughing
- **Treatment**: Inhalers (bronchodilators, corticosteroids), avoiding triggers

### 2. Bronchitis
- **Cause**: Inflammation of bronchi, usually due to infection
- **Types**: 
  - Acute bronchitis (short-term, often viral)
  - Chronic bronchitis (long-term, often from smoking)
- **Symptoms**: Persistent cough, mucus production, chest discomfort
- **Treatment**: Rest, fluids, cough medicine, antibiotics (if bacterial)

### 3. Pneumonia
- **Cause**: Infection of alveoli (bacterial, viral, or fungal)
- **Symptoms**: High fever, cough with mucus, chest pain, difficulty breathing
- **Risk factors**: Weak immune system, smoking, chronic diseases
- **Treatment**: Antibiotics (bacterial), antivirals, rest, oxygen therapy

### 4. Tuberculosis (TB)
- **Cause**: Mycobacterium tuberculosis bacteria
- **Transmission**: Airborne (coughing, sneezing)
- **Symptoms**: Persistent cough (>3 weeks), blood in sputum, night sweats, weight loss
- **Treatment**: Long-term antibiotics (6-9 months)
- **Prevention**: BCG vaccine, good ventilation, early detection

### 5. Lung Cancer
- **Cause**: Uncontrolled cell growth in lungs
- **Main risk factor**: Smoking (responsible for 85% of cases)
- **Symptoms**: Persistent cough, coughing blood, chest pain, weight loss
- **Treatment**: Surgery, chemotherapy, radiation therapy
- **Prevention**: Avoid smoking and secondhand smoke

### 6. Emphysema
- **Cause**: Damage to alveoli, usually from smoking
- **Effect**: Reduced gas exchange efficiency
- **Symptoms**: Shortness of breath, chronic cough
- **Treatment**: Bronchodilators, oxygen therapy, lung transplant (severe cases)
- **Prevention**: Quit smoking, avoid air pollution

## Factors Affecting Respiratory Health

### Smoking
- Damages cilia in airways
- Increases mucus production
- Causes inflammation and narrowing of airways
- Contains carcinogens leading to lung cancer
- Leads to COPD (Chronic Obstructive Pulmonary Disease)

### Air Pollution
- Particulate matter damages lung tissue
- Irritates airways
- Increases risk of respiratory infections
- Exacerbates existing respiratory conditions

### Occupational Hazards
- Asbestos exposure → Asbestosis
- Coal dust → Black lung disease
- Silica dust → Silicosis
- Chemical fumes → Various lung diseases

## Maintaining Respiratory Health

### Healthy Practices:
1. **Don't smoke**: Avoid tobacco and secondhand smoke
2. **Exercise regularly**: Strengthens respiratory muscles
3. **Good posture**: Allows lungs to expand fully
4. **Deep breathing**: Improves lung capacity
5. **Avoid pollutants**: Wear masks in polluted areas
6. **Vaccinations**: Get flu and pneumonia vaccines
7. **Proper ventilation**: Ensure good air circulation indoors
8. **Healthy diet**: Antioxidants support lung health
9. **Hydration**: Keeps mucus membranes moist
10. **Regular check-ups**: Early detection of problems

### Warning Signs to See a Doctor:
- Persistent cough (>3 weeks)
- Coughing up blood
- Severe shortness of breath
- Chest pain
- Wheezing
- Frequent respiratory infections
- Unexplained weight loss
        `,
        videoUrl: "https://youtu.be/fQsgZloXNPY?si=PQCh3p0TOv1pPomY",
        quiz: {
          questions: [
            {
              id: 1,
              question: "What is the main cause of lung cancer?",
              options: [
                "Air pollution",
                "Smoking",
                "Poor diet",
                "Lack of exercise"
              ],
              correctAnswer: 1,
              explanation: "Smoking is the leading cause of lung cancer, responsible for approximately 85% of all cases. Cigarette smoke contains numerous carcinogens that damage lung cells and can lead to cancerous growth."
            },
            {
              id: 2,
              question: "Which disease is characterized by inflammation and narrowing of airways?",
              options: [
                "Tuberculosis",
                "Pneumonia",
                "Asthma",
                "Emphysema"
              ],
              correctAnswer: 2,
              explanation: "Asthma is characterized by inflammation and narrowing of the airways, leading to symptoms like wheezing, shortness of breath, and coughing. It can be triggered by allergens, cold air, exercise, or stress."
            },
            {
              id: 3,
              question: "How is tuberculosis (TB) transmitted?",
              options: [
                "Through contaminated water",
                "Through insect bites",
                "Through airborne droplets",
                "Through skin contact"
              ],
              correctAnswer: 2,
              explanation: "Tuberculosis is transmitted through airborne droplets when an infected person coughs or sneezes. This is why good ventilation and wearing masks are important preventive measures."
            }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Chapter 2: Coordination & Response",
    icon: "🧠",
    subchapters: [
      {
        id: 2.1,
        title: "2.1 The Nervous System",
        content: `
# The Nervous System

The nervous system is the body's control and communication system. It detects changes in the environment, processes information, and coordinates appropriate responses.

## Structure of the Nervous System

### Central Nervous System (CNS)
Consists of:
1. **Brain**: Control center of the body
2. **Spinal cord**: Connects brain to peripheral nervous system

### Peripheral Nervous System (PNS)
Consists of nerves that connect CNS to all parts of the body:
1. **Sensory nerves**: Carry information TO the CNS
2. **Motor nerves**: Carry commands FROM the CNS

## The Neuron

Neurons (nerve cells) are specialized cells that transmit electrical signals. A typical neuron consists of:

- **Cell body**: Contains nucleus and organelles
- **Dendrites**: Short extensions that receive signals
- **Axon**: Long extension that transmits signals
- **Myelin sheath**: Insulating layer that speeds up transmission
- **Axon terminals**: End branches that transmit to next neuron

### Types of Neurons:
1. **Sensory neurons**: Transmit signals from receptors to CNS
2. **Motor neurons**: Transmit signals from CNS to effectors
3. **Relay neurons**: Connect sensory and motor neurons in CNS

## How Nerve Impulses Work

1. **Resting state**: Neuron maintains electrical potential
2. **Stimulation**: Stimulus triggers change in membrane
3. **Action potential**: Electrical signal generated and travels along axon
4. **Synapse**: Signal crosses gap between neurons via neurotransmitters
5. **Response**: Signal reaches effector (muscle or gland)

## The Brain

### Main Parts of the Brain:

1. **Cerebrum**: Largest part
   - Controls conscious thought, memory, intelligence
   - Processes sensory information
   - Controls voluntary movements
   - Divided into left and right hemispheres

2. **Cerebellum**: Below cerebrum at back
   - Controls balance and coordination
   - Refines movements
   - Maintains posture

3. **Medulla oblongata**: Connects to spinal cord
   - Controls involuntary actions (breathing, heartbeat)
   - Controls reflexes (coughing, vomiting)

4. **Hypothalamus**: Below cerebrum
   - Regulates body temperature
   - Controls hunger and thirst
   - Regulates sleep patterns

## Reflex Actions

Reflex actions are rapid, automatic responses that don't involve conscious thought:

### Reflex Arc Pathway:
Stimulus → Receptor → Sensory neuron → Relay neuron (spinal cord) → Motor neuron → Effector → Response

### Examples:
- Withdrawing hand from hot object
- Knee-jerk reflex
- Blinking when object approaches eye
- Pupil dilation/constriction

### Importance:
- Protect body from harm
- Faster than conscious responses
- Don't require thought or decision-making
        `,
        videoUrl: "https://youtu.be/RClEbcPD9q0?si=08Er4CFn2810YBOv",
        quiz: {
          questions: [
            {
              id: 1,
              question: "Which part of the brain controls balance and coordination?",
              options: [
                "Cerebrum",
                "Cerebellum",
                "Medulla oblongata",
                "Hypothalamus"
              ],
              correctAnswer: 1,
              explanation: "The cerebellum is responsible for controlling balance, coordination, and refining movements. It is located below the cerebrum at the back of the brain."
            },
            {
              id: 2,
              question: "What is the pathway of a reflex arc?",
              options: [
                "Receptor → Motor neuron → Sensory neuron → Effector",
                "Receptor → Sensory neuron → Relay neuron → Motor neuron → Effector",
                "Effector → Relay neuron → Receptor",
                "Brain → Spinal cord → Muscle"
              ],
              correctAnswer: 1,
              explanation: "The correct reflex arc pathway is: Stimulus → Receptor → Sensory neuron → Relay neuron (in spinal cord) → Motor neuron → Effector → Response. This pathway bypasses the brain for faster response."
            }
          ]
        }
      },
      {
        id: 2.2,
        title: "2.2 The Endocrine System",
        content: `
# The Endocrine System

The endocrine system consists of glands that produce and secrete hormones directly into the bloodstream. Hormones are chemical messengers that regulate various body functions.

## Major Endocrine Glands

### 1. Pituitary Gland ("Master Gland")
**Location**: Base of brain
**Hormones produced**:
- Growth hormone (GH): Promotes growth
- Thyroid-stimulating hormone (TSH): Stimulates thyroid
- ADH (Antidiuretic hormone): Controls water balance

### 2. Thyroid Gland
**Location**: Neck
**Hormone**: Thyroxine
**Functions**:
- Regulates metabolic rate
- Controls growth and development
- Affects body temperature

### 3. Adrenal Glands
**Location**: Above kidneys
**Hormones**:
- Adrenaline: "Fight or flight" response
- Cortisol: Stress response, metabolism

### 4. Pancreas
**Location**: Behind stomach
**Hormones**:
- Insulin: Lowers blood glucose
- Glucagon: Raises blood glucose

### 5. Ovaries (Females)
**Location**: Pelvic cavity
**Hormones**:
- Estrogen: Female sex characteristics, menstrual cycle
- Progesterone: Prepares uterus for pregnancy

### 6. Testes (Males)
**Location**: Scrotum
**Hormone**: Testosterone
**Functions**: Male sex characteristics, sperm production

## Blood Glucose Regulation

The pancreas maintains blood glucose homeostasis:

### When Blood Glucose is HIGH (after eating):
1. Pancreas detects high glucose
2. Releases insulin
3. Insulin causes:
   - Cells absorb glucose
   - Liver converts glucose to glycogen (storage)
4. Blood glucose decreases to normal

### When Blood Glucose is LOW (during fasting/exercise):
1. Pancreas detects low glucose
2. Releases glucagon
3. Glucagon causes:
   - Liver converts glycogen to glucose
   - Release of glucose into blood
4. Blood glucose increases to normal

## Diabetes Mellitus

### Type 1 Diabetes:
- **Cause**: Pancreas produces little/no insulin
- **Onset**: Usually childhood/adolescence
- **Treatment**: Regular insulin injections
- **Management**: Monitor blood glucose, balanced diet, exercise

### Type 2 Diabetes:
- **Cause**: Body becomes resistant to insulin
- **Risk factors**: Obesity, lack of exercise, genetics, age
- **Onset**: Usually adulthood
- **Treatment**: Diet control, exercise, medication, sometimes insulin
- **Prevention**: Healthy lifestyle, maintain healthy weight

## Nervous System vs Endocrine System

| Feature | Nervous System | Endocrine System |
|---------|----------------|------------------|
| Signal type | Electrical impulses | Chemical (hormones) |
| Transmission | Neurons | Bloodstream |
| Speed | Very fast (milliseconds) | Slower (seconds to hours) |
| Duration | Short-lived | Long-lasting |
| Target | Specific (precise location) | Widespread (multiple organs) |
| Examples | Reflex, movement | Growth, metabolism |
        `,
        videoUrl: "https://youtu.be/RClEbcPD9q0?si=08Er4CFn2810YBOv",
        quiz: {
          questions: [
            {
              id: 1,
              question: "Which hormone lowers blood glucose levels?",
              options: [
                "Glucagon",
                "Insulin",
                "Adrenaline",
                "Thyroxine"
              ],
              correctAnswer: 1,
              explanation: "Insulin, produced by the pancreas, lowers blood glucose levels by promoting glucose uptake by cells and conversion of glucose to glycogen in the liver."
            },
            {
              id: 2,
              question: "What is the main difference between nervous and endocrine systems?",
              options: [
                "Nervous system uses hormones, endocrine uses electrical signals",
                "Nervous system is fast and short-lived, endocrine is slower and long-lasting",
                "Nervous system controls growth, endocrine controls movement",
                "They are exactly the same"
              ],
              correctAnswer: 1,
              explanation: "The nervous system uses electrical impulses transmitted through neurons for fast, short-lived responses. The endocrine system uses hormones carried in the bloodstream for slower but longer-lasting effects."
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Chapter 3: Reproduction",
    icon: "🌱",
    subchapters: [
      {
        id: 3.1,
        title: "3.1 Asexual Reproduction",
        content: `
# Asexual Reproduction

Asexual reproduction is a mode of reproduction that involves only one parent and produces offspring genetically identical to the parent.

## Characteristics of Asexual Reproduction

- **Single parent**: Only one organism involved
- **No gametes**: No sex cells (sperm/egg) needed
- **No fertilization**: No fusion of gametes
- **Genetic clones**: Offspring identical to parent
- **Faster process**: Generally quicker than sexual reproduction
- **No variation**: Offspring lack genetic diversity (except mutations)

## Types of Asexual Reproduction

### 1. Binary Fission
- Common in bacteria and some protists
- Parent cell divides into two equal daughter cells
- **Example**: Amoeba, bacteria
- **Process**:
  1. DNA replicates
  2. Cell elongates
  3. Cell divides into two identical cells

### 2. Budding
- New organism develops as an outgrowth from parent
- Bud detaches when mature
- **Examples**: Yeast, Hydra
- **Process**:
  1. Small bud forms on parent
  2. Bud grows and develops
  3. Bud separates or remains attached (yeast colonies)

### 3. Spore Formation
- Produces specialized cells called spores
- Spores can survive harsh conditions
- **Examples**: Fungi (mushrooms, molds), ferns, mosses
- **Process**:
  1. Spores produced in spore cases
  2. Spores released and dispersed
  3. Each spore grows into new organism

### 4. Vegetative Propagation
- Reproduction from vegetative parts (not seeds)
- Common in plants
- **Natural methods**:
  - **Runners/Stolons**: Strawberry
  - **Rhizomes**: Ginger, bamboo
  - **Bulbs**: Onion, tulip
  - **Tubers**: Potato
  - **Corms**: Taro

### 5. Fragmentation
- Parent breaks into fragments
- Each fragment develops into new organism
- **Examples**: Planaria (flatworm), starfish
- **Process**:
  1. Organism breaks apart
  2. Each fragment regenerates missing parts
  3. Multiple new organisms formed

## Artificial Vegetative Propagation

Humans use asexual reproduction in agriculture:

### 1. Cuttings
- Cut stem/leaf planted in soil
- Develops roots and grows
- **Examples**: Rose, sugarcane, cassava

### 2. Grafting
- Cut stem (scion) joined to rooted plant (stock)
- Tissues grow together
- **Advantages**: Combines desirable traits
- **Examples**: Fruit trees (mango, apple)

### 3. Layering
- Branch buried in soil while attached to parent
- Develops roots, then separated
- **Example**: Jasmine

### 4. Tissue Culture
- Small tissue sample grown in nutrient medium
- Produces many identical plants
- **Advantages**: Mass production, disease-free plants
- **Examples**: Orchids, oil palm

## Advantages of Asexual Reproduction

1. **Fast reproduction**: Single parent, no need to find mate
2. **Large numbers**: Can produce many offspring quickly
3. **Energy efficient**: Less energy than sexual reproduction
4. **Preserves traits**: Maintains desirable characteristics
5. **Colonization**: Rapid spread in favorable environments
6. **No mate needed**: Beneficial in isolated environments

## Disadvantages of Asexual Reproduction

1. **No variation**: All offspring genetically identical
2. **No evolution**: Limited ability to adapt to changes
3. **Disease susceptibility**: Whole population vulnerable to same disease
4. **Crowding**: Offspring compete for resources
5. **Harmful mutations**: Passed to all offspring
        `,
        videoUrl: "https://youtu.be/i9zj9V8OWRk?si=tOHf4Zd7HG5SCDcY",
        quiz: {
          questions: [
            {
              id: 1,
              question: "Which of the following is a characteristic of asexual reproduction?",
              options: [
                "Involves two parents",
                "Produces genetically diverse offspring",
                "Requires fertilization",
                "Produces offspring identical to parent"
              ],
              correctAnswer: 3,
              explanation: "Asexual reproduction produces offspring that are genetically identical to the single parent organism, creating clones."
            },
            {
              id: 2,
              question: "Which type of asexual reproduction is used by yeast?",
              options: [
                "Binary fission",
                "Budding",
                "Spore formation",
                "Fragmentation"
              ],
              correctAnswer: 1,
              explanation: "Yeast reproduces asexually through budding, where a small bud grows on the parent cell, develops, and eventually separates to become an independent organism."
            }
          ]
        }
      }
    ]
  }
]
