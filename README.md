### Encrypt password

Using this package: https://www.npmjs.com/package/bcrypt

userSchema.pre("save", async function (next) {
const salt = await bcrypt.genSaltSync(10);
this.password = await bcrypt.hashSync(this.password, salt);
});

### handle token

Using this package: https://www.npmjs.com/package/jsonwebtoken
