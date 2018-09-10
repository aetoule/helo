module.exports = {
   postUser: (req, res) => {
    const dbInstance = req.app.get('db');
        dbInstance.create_user()
        .then(stuff => res.status(200).send(stuff) )
        .catch(err => {
            res.status(500).send({errorMessage: "Error with creating user."}, err);
        });
   },
   postLogin: (req, res) => {
    const dbInstance = req.app.get('db');
        dbInstance.create_user()
        .then(stuff => res.status(200).send(stuff) )
        .catch(err => {
            res.status(500).send({errorMessage: "Error with creating user."}, err);
        });
    },
    getPosts: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.get_posts()
        .then(stuff => res.status(200).send(stuff))
        .catch(err => {
            res.status(500).send({errorMessage: "Error with getting posts."}, err);
        })
    }
}