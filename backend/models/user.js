const db = require("../db/index");

const tableName = "user";

const findAll = async () => {
  try {
    const result = await db
      .select("userName", "firstName", "lastName", "email", "google")
      .from(tableName);

    if (result.length) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const find = async (id) => {
  try {
    const result = await db.select().from(tableName).where("userId", id);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const findByUserName = async (userName) => {
  try {
    const result = await db
      .select()
      .from(tableName)
      .where("userName", userName);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const findByGoogleId = async (googleId) => {
  try {
    const googleIdString = `"${googleId}"`;

    const result = await db
      .select()
      .from(tableName)
      .whereRaw("jsonb_path_query_first(\"google\", '$.id')::text = ?", [
        googleIdString,
      ]);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const findByEmail = async (email) => {
  try {
    const result = await db.select().from(tableName).where("email", email);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const create = async (props) => {
  try {
    const result = await db(tableName)
      .insert(props)
      .returning([
        "userId",
        "lastName",
        "firstName",
        "userName",
        "email",
        "google",
        "profileImg",
      ]);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const remove = async (userId) => {
  try {
    const result = await db.delete().from(tableName).where("userId", userId);

    if (result) {
      return result;
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (props, userId) => {
  try {
    const userProps = props;
    delete userProps.userId;
    const result = await db
      .update(props)
      .from(tableName)
      .where("userId", userId);

    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (err) {
    throw new Error(err);
  }
};

const userModel = {
  findAll,
  find,
  findByEmail,
  findByGoogleId,
  findByUserName,
  create,
  remove,
  update,
};

module.exports = {
  userModel,
};
