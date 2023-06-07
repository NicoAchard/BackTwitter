// const Likes = require("../models/Likes");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const formidable = require("formidable");
const jwt = require("jsonwebtoken");

// Display a listing of the resource.
async function indexLogin(req, res) {
  return res.render("pages/login");
}

async function indexSignUp(req, res) {
  return res.render("pages/signup");
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const form = formidable({
      multiples: false,
      uploadDir: __dirname + "/../public/img",
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        req.flash("failureFlash", "Ha ocurrido un error. Por favor, inténtelo de nuevo.");
        return res.redirect("back");
      }
      console.log(files);

      try {
        const user = await User.create({
          firstName: fields.firstname,
          lastName: fields.lastname,
          email: fields.email,
          username: fields.username,
          password: await bcrypt.hash(fields.password, 2),
          createdAt: new Date(),
          updatedAt: new Date(),
          description: "|||||||||||||||||||||||",
          profilePicture: files.file.newFilename,
        });

        req.flash("successFlash", "Registro exitoso. Inicie sesión para continuar.");
        return req.login(user, () => res.redirect("/tweet"));
      } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username === 1) {
          req.flash("failureFlash", "El username ya está en uso. Por favor, elija otro username.");
          return res.redirect("back");
        } else {
          console.error(error);
          req.flash("failureFlash", "El email ya fue registrado con otra cuenta.");
          return res.redirect("back");
        }
      }
    });
  } catch (error) {
    console.log(error);
    req.flash("failureFlash", "Ha ocurrido un error. Por favor, inténtelo de nuevo.");
    return res.redirect("back");
  }
}

async function login(req, res) {
  const { usernameEmail, password } = req.body;
  try {
    let user = await User.findOne({
      email: usernameEmail,
    });
    if (!user) {
      user = await User.findOne({
        username: usernameEmail,
      });
    }
    if (!user) res.json("Credenciales inválidas");
    if (!user.comparePassword(password)) res.json("Credenciales inválidas");
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    return res.json({ token });
  } catch (e) {
    return console.log(e);
  }
}

async function indexLogout(req, res) {
  req.session.destroy(function (err) {
    res.redirect("/login");
  });
}

module.exports = {
  indexLogin,
  indexSignUp,
  store,
  login,
  indexLogout,
};
