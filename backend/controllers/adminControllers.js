import stateSchema from '../model/stateModal.js'
import subjectSchema from '../model/subjectModal.js'
import registrationSchema from '../model/registrationModal.js'
import { jwtAccessToken } from '../Services/jwtServices.js'

const adminControllers = {
    addExamState: async (req, res) => {
        try {
            const state = req?.body?.value
            const newState = state?.toUpperCase();
            const isState = await stateSchema.findOne({ stateName: newState })

            if (isState) {
                res.json({ status: false, message: 'state already existis' })
            } else {
                const addState = await stateSchema.create({ stateName: newState })
                res.json({ status: true, message: 'added successfully' })
            }

        } catch (err) {
            console.log(err);
        }
    },

    addExamSubject: async (req, res) => {
        try {
            const subject = req?.body?.value
            const newSubject = subject?.toUpperCase();
            console.log(newSubject);
            const isSubject = await subjectSchema.findOne({ subjectName: newSubject })
            console.log(isSubject);
            if (isSubject) {
                console.log('subject is already ind');
                res.json({ status: false, message: 'subject already existis' })
            } else {
                const addSubject = await subjectSchema.create({ subjectName: newSubject })
                res.json({ status: true, message: 'added successfully' })
            }

        } catch (err) {
            console.log(err);
        }
    },

    getAllStateDetails: async (req, res) => {
        try {
            const stateDetails = await stateSchema.find()
            res.json(stateDetails)
        } catch (err) {
            console.log(err);
        }
    },
    addCity: async (req, res) => {
        try {
            const stateId = req?.body?.selectedState
            const city = req?.body?.city
            const newCity = city.toUpperCase();
            const isCityAlready = await stateSchema.findOne({ _id: stateId, city: { $elemMatch: { $eq: newCity } } })
            if (isCityAlready) {
                res.json({ status: false })
            } else {
                await stateSchema.findByIdAndUpdate(stateId, { $push: { city: newCity } })
                res.json({ status: true })
            }

        } catch (err) {
            console.log(err);
        }
    },

    getSubjectDetails: async (req, res) => {
        try {
            const subjectDetails = await subjectSchema.find()
            res.json(subjectDetails)
        } catch (err) {
            console.log(err);
        }
    },

    toAddDateAndTime: async (req, res) => {
        try {
            const { subjectId, date, time } = req?.body
            const [hours, minutes] = date.split(':');
            const [year, month, day] = time.split("-");
            let formattedHours = parseInt(hours);
            const period = formattedHours >= 12 ? 'PM' : 'AM';

            if (formattedHours === 0) {
                formattedHours = 12;
            } else if (formattedHours > 12) {
                formattedHours = formattedHours - 12;
            }

            const formattedTime = `${formattedHours}:${minutes} ${period}`;
            const formattedDate = `${day}-${month}-${year}`;

            const itemShouldAdd = `on ${formattedDate} at ${formattedTime}`
            console.log(itemShouldAdd);

            const isDateandTimeIsAlreadyHave = await subjectSchema.findOne({
                _id: subjectId,
                dateAndTime: { $elemMatch: { $eq: itemShouldAdd } },

            });
            if (isDateandTimeIsAlreadyHave) {
                console.log('its already exists')
                res.json({ status: false })
            } else {
                console.log('can add this ');
                await subjectSchema.findByIdAndUpdate(subjectId, { $push: { dateAndTime: itemShouldAdd } })
                res.json({ status: true })
            }
        } catch (err) {
            console.log(err);

        }
    },
    getAllRegistrations: async (req, res) => {
        try {

            const getItems = await registrationSchema.find()

            res.json(getItems)
        } catch (err) {
            console.log(err);
        }
    },
    toAdminLogin: async (req, res) => {
        try {
            const { email, password } = req?.body
            //password need to bcrypt and then need to store in the database, here i am not creating a admin in the database.
            // I am just creating a super Admin and am simply checking the email and password in the serverside it not good pratice!

            const newPassword = password.toString()
            const validEmail = 'admin@gmail.com'
            const validPassword = '12345'
            if (email === validEmail) {
                if (validPassword === newPassword) {
                    const adminJwtAccessToken = await jwtAccessToken(validEmail)
                    res.json({ status: true, accessToken: adminJwtAccessToken })
                } else {
                    res.json({ status: false, message: 'not a valid email or password' })
                }
            } else {
                res.json({ status: false, message: 'not a valid email or password' })
            }
        } catch (err) {

        }
    }
}

export default adminControllers