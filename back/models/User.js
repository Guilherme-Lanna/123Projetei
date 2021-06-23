module.exports = (sequelize,DataTypes) => {

    const Users = sequelize.define("Users", {

        username: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type:DataTypes.STRING,
            allowNull: true,
        },
        
    })

    return Users;

}