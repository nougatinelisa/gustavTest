module.exports = function(app) {
    var User = app.models.user;
    var role = app.models.Role;
    var RoleMapping = app.models.roleMapping;
};

//create the superAdmin role
role.create({
    name: 'superAdmin'
}, function(err, role) {
    if (err) throw err;

    console.log('Created role:', role)
});

//create the admin role
role.create({
    name: 'admin'
}, function(err, role) {
    if (err) throw err;

    console.log('Created role:', role)
});
