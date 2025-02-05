import models from "../../models";

/**
 * We call this [findUserByEmail] twice during the signup process;
 *  1. During the signup form validation.
 *     This ensures that candidate's data is checked and not saved
 *     in Redis. This save some Redis resources and time.
 *  2. During retrieving candidate's data from redis and saving it in the DB.
 *
 * Signup Context:
 * A candidate initiates a signup process and submits the form, it is then
 * validated. If it passes the validation check, the candidate's data
 * is saved in Redis until when the candidate confirms the email by submiting
 * the valid verification code sent to it. (The candidate can request to resend
 * the verification code).
 *
 * If the candidate submits the valid verification code, their data is
 * retrieved from the Redis Store.
 * At this point we perform another findUserByEmail query to the database.
 * It is important to do so because it is possible that two candidates
 * attempted to signup using the same email, but one verified the email
 * before the other. So we don't want to endup with duplicate emails.
 */

const findUserByEmail = (email: string) =>
  models.User.findOne({
    where: { email },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

export default findUserByEmail;
