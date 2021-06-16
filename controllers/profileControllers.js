const { response } = require("express");
const Users = require("../models/users");

module.exports.getProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id)
            .populate({ path: "questionsAsked", populate: { path: "answers" } })
            .populate({ path: "answers", populate: { path: "questionId" } });
        res.render("profile", {
            user: user,
        });
    } catch (err) {
        console.log(err);
    }
};

//get profile by id
module.exports.getProfileById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.uid)
            .populate({ path: "questionsAsked", populate: { path: "answers" } })
            .populate({ path: "answers", populate: { path: "questionId" } })
            .populate({ path: 'followers' })
            .populate({ path: 'following' });
        var status = "Follow"
        if (req.user) {
            var present = user.followers.find(follower => {
                console.log(follower)
                return follower.id === req.user.id
            })
            if (present) {
                status = "Unfollow"
            }
        }

        return res.render("otherProfile", {
            user: user,
            status: status,
        });
    } catch (err) {
        console.log(err);
    }
};

//edit profile
module.exports.editProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        Users.uploadAvatar(req, res, (err) => {
            if (err) {
                console.log(err);
            }
            user.name = req.body.newName;
            if (req.file) {
                console.log(req.file.filename);
                user.avatar = Users.avatarPath + "/" + req.file.filename;
            }
            user.save();
            return res.redirect("/auth/login");
        });
    } catch (err) {
        console.log(err);
    }
};

//follow controllers
module.exports.followUser = async (req, res) => {
    try {
        if (req.user) {
            const followUser = await Users.findById(req.params.aid);
            const user = await Users.findById(req.user.id);
            var index = followUser.followers.indexOf(req.user.id);
            if (index == -1) {
                followUser.followers.push(req.user.id);
                followUser.save();
                user.following.push(req.params.aid);
                user.save();
                return res.send("Unfollow");
            } else {
                followUser.followers.splice(index, 1);
                followUser.save();
                index = user.following.indexOf(req.params.id);
                user.following.splice(index, 1);
                user.save();
                return res.send("Follow");
            }
        } else {
            return res.send(null);
        }
    } catch (err) {
        console.log(err);
    }
};
