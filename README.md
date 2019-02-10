# HealthSense Demos


## What is Healthsense?

HealthSense is a project by Rice Scalable Health that allows researchers to conduct large scale longitudinal studies that require survey questions and physiological data. Sign up is completely free. After you create an account on the HealthSense web portal, you can create studies, add questions to those studies, add participants to your study, set up an automated schedule for your study, and download the data at any time. To learn more, visit https://healthsense.rice.edu



## Question Types

### Supported Question Types
1. *Multiple Choice* - Participants select from one of many options.
2. *Slider Questions* - Participants select anywhere on a range.
3. *GPS Location* - Longitude and Latitude from the participant's mobile device.
4. *Step Counter* - A record of steps taken from the participant's mobile device.
5. *iCO Smokerlyzer* - An external medical device that records CO in lungs.
6. *Heart Rate* - Tracking HR through apple watch.
7. *Image Capture* - Participants upload images according to prompt.
8. *Free Form* - Participants can write a long form response to questions.
9. *Food Diary* - Participants can keep a diary of their food consumption for the day.
10. *Text/Call Logs* - Keeps track of the participant's hashed cell phone communications.

### Question Types Under Development
1. *Internet/App Usage* - Track app and internet usage from a participant's mobile device
2. *GCM* - External device that tracks the participant's glucose levels. 
3. *Question Composition* - A tool for researchers to ask a sequence of questions the is procedurally decided.



## Schedule Types

Researchers can create one of 4 different schedule types
1. *Daily Schedule* - Set up a specific number of days each with their own notifications, questions, and sensors.
2. *Weekly Schedule* - Set up notifications, questions, and sensors for each day of the week.
3. *Same Every Day Schedule* - Set up notifications, questions, and sensors for one day and have that day repeat.
4. *Custom Schedule* - Input a block of code that is executed routinely to check conditions, enable/disable sensors and questions, send notifications, or do complex data analysis.


## Custom Schedule Demos

This repository gives many examples of custom schedule code that can be copied and pasted into the healthsense platform in order to replicate findings. Each of the demos is described in detail below. More detailed information on how to use the platform can be found at https://healthsense.rice.edu/documentation


### [Eating Habits](./eating_habits.js)
Using the location sensor on a mobile device and givea  rough  estimate  of  a  participant’s  location,  but  thisestimate  is  noisy  and  sometimes  unclear.   When  theuser’s location is in close proximity to a restaurant fora specified duration, the participant can be asked if theyate at that restaurant to get a more accurate assessmentof eating habits.
### [Text/Call Metadata](./text_call_metadata.js)
If a study requires the use of SMS or phone call meta-data,  the  study  can  query  the  user  for  more  detailsabout the subject of specific texts/calls or the partic-ipant’s  relation  to  people  that  they  frequently  call  ortext.
### [Detecting the Cause of HR Anomalies](./detecting_hr_anomalies.js)
Anomalies in heart rate can have many causes. Some-times, the cause of these anomalies can be deduced bydata from other sensors, but other times the anomalyneeds  to  be  further  clarified  by  querying  the  user  forwhat  they  think  the  cause  of  the  anomaly  might  be.This  can  help  researchers  identify  events  in  a  partici-pants day that would contribute to unusually high heartrate variability.
### [Mood and Mobility](./mood_mobility.js)
Assessing  how  mood  correlates  to  mobility  necessi-tates  collection  of  survey  data  during  periods  of  bothhigh and low mobility.  Since it is impossible continu-ously query the user about their mood, your data dis-tribution  will  likely  be  asymmetrical  with  little  datacollected during moments of high mobility.  Using thiscontext-dependent platform, mood can be queried morefrequently during periods of high mobility.
### [Randomized Trials](./randomized_trial.js)
Randomized clinical trials are the most common and basic trial format where participants are randomly assigned to group A or B and different treatments are given to each group based on their group assignment. This specific randomized trial is an example of a JITAI that tries to differentiate between effects of different types of intervention notifications. At the beginning of the study, the groups are randomly assigned. Participants are asked to keep a food diary of the food they eat. Each day, during breakfast lunch and dinner a reminder is sent to the participants in group A to eat healthier and no such notification is sent to the participants in group B.
### [Adaptive Clinical Trials](./adaptive_trial.js)
TODO
### [Time-varying Interventions](./SMART.js)
TODO




