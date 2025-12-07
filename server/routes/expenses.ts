import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  amount: z.number().int().positive(),
});

const createExpenseSchema = expenseSchema.omit({ id: true });

type Expense = z.infer<typeof expenseSchema>;

const FAKE_EXPENSES: Expense[] = [
  { id: 1, title: "Groceries", amount: 100.0 },
  { id: 2, title: "Gas", amount: 51.0 },
];

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 100));
    return c.json({ expenses: FAKE_EXPENSES });
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const data = c.req.valid("json");
    const newExpense = { id: FAKE_EXPENSES.length + 1, ...data };
    FAKE_EXPENSES.push(newExpense);
    return c.json(newExpense);
  })
  .get("/total-spent", (c) => {
    const total = FAKE_EXPENSES.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    return c.json({ total });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number(c.req.param("id"));
    const expense = FAKE_EXPENSES.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  });
