module.exports = function(app) {
    var User = app.models.utilisateur;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
//
//     User.create([
//         {username: 'Jane', email: 'jane@doe.com', password: 'root'}
//     ], function(err, users) {
//         if (err) throw err;
//
//     //create the superAdmin role
//     role.create({
//         name: 'superAdmin'
//     }, function(err, role) {
//         if (err) throw err;
//
//         console.log('Created role:', role)
//     });
//
//     //create the admin role
//     role.create({
//         name: 'admin'
//     }, function(err, role) {
//         if (err) throw err;
//
//         console.log('Created role:', role);
//
//         //make user with id=2 an admin
//         role.principals.create({
//             principalType: RoleMapping.USER,
//             principalId: users[4]
//         }, function(err, principal) {
//             if (err) throw err;
//
//             console.log('Created principal:', principal);
//         });
//     });
//     })
// };

    RoleMapping.belongsTo(User);
    User.hasMany(RoleMapping, {foreignKey: 'principalId'});
    Role.hasMany(User, {through: RoleMapping, foreignKey: 'roleId'});
};
