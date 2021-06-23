module.exports = (sequelize,DataTypes) => {

    const pessoa_fisica = sequelize.define("pessoa_fisica", {

        CPF_PK: {
            type:DataTypes.STRING(20),
            primaryKey: true,
            autoIncrement: false, 
            allowNull: false,
        },
        nome_pessoa: {
            type:DataTypes.STRING(45),
            allowNull: true,
        },
        telefone_pessoa: {
            type:DataTypes.STRING(20),
            allowNull: true,
        },
        dt_nasc_pessoa: {
            type:DataTypes.DATEONLY,
            allowNull: true,
        },
        
    })

    return pessoa_fisica

}