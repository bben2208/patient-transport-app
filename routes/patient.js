const { ensureAuthenticated } = require("../middleware/auth");

router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", { user: req.user });
});
