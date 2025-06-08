const URL = "https://run.mocky.io/v3/6eace22c-d4f2-4358-a6eb-1bcaf5177932";

export const validateRegistrationNo = async (req, res, next) => {
  const { registrationId, name } = req.body;

  if (!registrationId) {
    return res.status(400).json({ error: "Registration number is required" });
  }

  try {
    const response = await fetch(URL);
    const doctors = await response.json();

    const exists = doctors.some((doc) => doc.registrationId === registrationId);
    console.log("Registration number exists:", exists);

    if (!exists) {
      return res
        .status(400)
        .json({ error: "Registration number does not exists" });
    }

    next();
  } catch (error) {
    console.error("Error validating registration number:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
