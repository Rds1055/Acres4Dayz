const random = new (require('chance'));
const bcrypt = require('bcrypt');

/**
 * Chance is a random generator library. Start with their documentation: https://chancejs.com/.
 * The library has tons of data generators for basic things like words, names, emails, phone
 * numbers, integers, floating point data, and lots more. It's not meant to be a _TRULY_ random
 * data generator. Rather, it's a utility to generate fake test data, in particular for things
 * like writing unit tests or in our case seeding a database with mock data.
 * 
 * While chance has a lot of generators built in, it becomes most powerful when you define your
 * own generator functions and add it to the library. Here we define a "mixins" object. Each
 * key in our object is a unique type of data we can generate. In general, you should have one
 * object generator per table in your schema, so that you can generate data for all your tables.
 * 
 * In each of these functions, it should return an object containing random data. For example,
 * a user in our DB schema is defined as an email and password. As such, the user generator
 * returns an object that contains an email and password key. Both of those things are randomly
 * generated.
 * 
 * Note the `options = {}` inside each of the function arguments. Those are called "overrides".
 * Consider the student generator. It returns an object containing a random id, name, and email.
 * So a sample returned object when calling:
 * 
 * random.student();
 * 
 * might look like:
 * 
 * { id: '76638115', name: 'Derek', email: 'lubmo@ninrezgec.vi' }
 * 
 * But what if we want to control one or many of the fields? That's what the overrides object
 * does: it is an object that is then "spread" on the resulting object. Refer to this doc for
 * lots of examples of this operator: https://www.javascripttutorial.net/es-next/javascript-object-spread/.
 * 
 * So now let's say we want to assign a specific name to a student, but keep the ID and email
 * random. We can do the following:
 * 
 * random.student({ name: 'Christian' });
 * 
 * Which can return:
 * 
 * { id: '137454706', name: 'Christian', email: 'ebimebij@sik.uz' }
 * 
 * The email and ID are still randomly generated, but the name is specified by the argument
 * passed in.
 */
const mixins = {
    user: (options = {}) => {
        const plainPassword = 'password';
        const hashedPassword = bcrypt.hashSync(plainPassword, 10);
        return {
            username: random.first().concat(random.last()),
            password: hashedPassword,
            email: random.email(),
            phone: Math.random().toString().slice(2,12),
            ...options,
        }
    },
    
    land: (options = {}) => {
        return {
            ID: random.integer({ min: 10000000, max: 999999999 }),
            acres: random.integer({ min: 1000, max: 9999 }),
            owner: random.first().concat(random.last()),
            description: random.paragraph().slice(0, 200),
            zip_code: random.integer({min: 10000, max: 99999}),
            suitable_for: "anyone",
            starting_bid: random.integer({ min: 100000, max: 999999 }),
            image: "farm" + random.integer({ min: 1, max: 5}).toString(),
            ...options,
        }
    },

    bid: (options = {}) => {
        return{
            ID: random.integer({ min: 10000000, max: 999999999 }),
            land_id: random.integer({ min: 10000000, max: 999999999 }),
            top_bid: random.integer({ min: 1, max: 999999999}),
            top_bidder: random.first().concat(random.last()),
            ...options
        } 
    },

    contract: (options = {}) => {
        const year = random.integer({ min: 2022, max: 2025});
        return{
            ID: random.integer({ min: 10000000, max: 999999999 }),
            land_id: random.integer({ min: 10000000, max: 999999999 }),
            renter: random.first().concat(random.last()),
            start: random.date({ year: year}),
            end: random.date({ year: random.integer({ min: year + 1, max: year + 5})}),
            ...options
        } 
    },

    review: (options = {}) => {
        return {
            ID: random.integer({ min: 10000000, max: 999999999 }).toString(),
            land_id: random.integer({ min: 10000000, max: 999999999 }),
            reviewer: random.first().concat(random.last()),
            rating: random.integer({ min: 0, max: 10}),
            contents: random.paragraph().slice(0, 200),
            ...options
        }
    },

    
};

random.mixin(mixins);

module.exports = random;