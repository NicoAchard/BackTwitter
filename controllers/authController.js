// const Likes = require("../models/Likes");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const formidable = require("formidable");

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

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/tweet",
    failureRedirect: "/login",
    failureFlash: {
      type: "failureFlash",
      message: "Parece que ha ocurrido un error con las credenciales, vuelve a intentarlo.",
    },
    successFlash: {
      type: "successFlash",
      message: "Has iniciado sesión correctamente!",
    },
  })(req, res);
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
