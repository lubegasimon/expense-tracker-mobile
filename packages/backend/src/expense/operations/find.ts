import { Op } from "sequelize";
import models from "../../models";
import { formatClientDate } from "../formatDate";

export const findExpenseById = (id: string) =>
  models.Expense.findByPk(id, {
    include: [{ model: models.Category, attributes: ["name"] }],
  });

export const findExpenseByDate = (date: Date | undefined) => {
  let startOfDay: Date;
  let endOfDay: Date;

  if (date) {
    const parsedDate = new Date(date);
    [startOfDay, endOfDay] = formatClientDate(parsedDate);
  } else {
    const today = new Date();
    [startOfDay, endOfDay] = formatClientDate(today);
  }

  return models.Expense.findAll({
    where: {
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
    include: [{ model: models.Category, attributes: ["name"] }],
    order: [["createdAt", "DESC"]],
  });
};
