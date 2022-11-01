import bcrypt from 'bcrypt';
import User from '../../models/User'
import ConnectToDB from '../../lib/mongodb'


async function checkPassword(plaintext, hash)
{
    const result = await bcrypt.compare(plaintext, hash);
    return result;
}

export default async function handler(req, res) {
    if (req.method === 'GET')
    {
        const query = req.query;

        const {email, password} = query;

        const user = await User.findOne({email: email}).exec();

        if (user)
        {
            if (await checkPassword(password, user.password))
            {
                res.status(200).json({status: "Login Successful"})
            }
        }

        else {
            res.status(400).json({error: "User does not exist"});
        }
    }

    else {

    }
  }