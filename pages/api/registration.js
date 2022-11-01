
import bcrypt from 'bcrypt';
import User from '../../models/User'

//use a post request when registering
export default async function handler(req, res) {
    if (req.method === 'POST')
    {
        const query = req.query;

        const {name, email, password} = query;

        if (name && email && password)
        {
            const passhash = await bcrypt.hash(password, 10);

            var User = new User({
                name,
                email,
                password: passhash
            });

            var didCreateUser = await user.save();
            return res.status(200).send(didCreateUser);
        }

        else {
            return res.status(400).json({error: "Not all fields we're filled, try again but with all fields filled."});
        }


    }

    else {
        res.status(400).json({error: 'Registration only accepts POST requests.'});
    }
  }
  