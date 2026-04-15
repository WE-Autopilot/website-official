1. Add Discord Username for /client/src/component/Contact.tsx

/client/src/type/index.tsx
Modified interface ValidationRules, add discordUsername

/client/src/component/Contact.tsx
Modified object validationRules
Added new rules for discordUsername

/client/src/utils/i18n.ts
Added an application message for Discord username
Added 2 error messages for Discord username

/server/models/Contact.js
Added the discordUsername in ContactSchema

2. Add and modify Team selection for /client/src/component/Contact.tsx

/client/src/component/Contact.tsx
Added one more component
Renamed some of the variances to match the name of each team

/client/src/utils/i18n.ts
Added a title and a description for Build Team

3. Remove Resume Upload section for /contact page

/client/src/component/Contact.tsx
Commented interface ResumeUploadSectionProps and its component
Commented ResumeUploadSection at return block

4. Add proof of payment(image upload)

/client/src/type/index.tsx
Added a Validation rule for screenshot

/client/src/component/Contact.tsx
Added a new rule for screenshot
Added ScreenshotUploadSection interface and component
Added ScreenshotUploadSection at return

/server/models/Contact.js
Added the screenshot in ContactSchema

/client/src/utils/i18n.ts
Added an error message for screenshot upload

5. Can choose multiple teams

/client/src/component/Contact.tsx
Added a validation rule for team
Refactor some of code in TeamSelectionSection

# General
Added some spacing to improve the readability

/server/models/Contact.js
There is a SchoolEmail in /client/src/component/Contact.tsx, 
while not existing in /server/models/Contact.js
Added an object for SchoolEmail, aligning with the Frontend

/client/src/utils/i18n.ts
Added a message for "error.teamRequired"
Replenished 3 application messages

/* ---------------------------- */

# to do
/contact

Personal Information
add discord Username section

Team selection
could choose one or even more team options
4 teams in total

remove Resume Upload

add a proof of payment of membership, receipt

/sponsor
make the Email: egreene4@uwo.ca, and direct to their email app