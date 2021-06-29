const { response } = require("express");
const Users = require("../models/users");
const fs = require('fs')
const path = require('path')

module.exports.getProfile = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id)
            .populate({ path: "questionsAsked", populate: { path: "answers", populate: { path: "userId" } } })
            .populate({ path: "answers", populate: { path: "questionId", populate: { path: "userId" } } })
            .populate('followers')
            .populate('following')
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
            .populate({
                path: "questionsAsked", populate: {
                    path: "answers",
                    options: {
                        sort: '-upvotes'
                    },
                    perDocumentLimit: 1,
                    populate: {
                        path: 'userId'
                    }
                }
            })
            .populate({
                path: "answers", populate: {
                    path: "questionId", populate: {
                        path: 'userId'
                    }
                }
            })
            .populate({ path: 'followers' })
            .populate({ path: 'following' });
        var status = "Follow"
        if (req.user) {
            var present = user.followers.find(follower => {
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
                if (user.avatar) {
                    const arr = user.avatar.split('/')
                    if (arr[4] != 'default') {
                        if (arr[0] != 'http:') {
                            if (fs.existsSync(path.join(__dirname, "..", user.avatar))) {
                                fs.unlinkSync(path.join(__dirname, "..", user.avatar))
                            }
                        }
                    }
                }

                let filePath = Users.avatarPath + "/" + req.file.filename;
                user.avatar = filePath.replace(/\\/g, '/')
                console.log(filePath)
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
