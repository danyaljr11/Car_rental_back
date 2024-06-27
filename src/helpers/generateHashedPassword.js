const passwordHash = require('password-hash')

const hashed = (password) => {
    if(password) {
        console.log(passwordHash.generate(password));
        return;
    }

    console.log('No password provided')
}

hashed('admin12345@Admin');