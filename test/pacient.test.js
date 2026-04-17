const {
  addPacient,
  selectPacient,
  updatePacient,
  findPacient,
  deletePacient,
} = require("../controller/pacientController");
const Pacient = require("../models/Patient");

// Mock del modelo Pacient
jest.mock("../models/Patient");

describe("Pacient Controller Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      send: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  // 1. Test para addPacient
  test("addPacient debería guardar un paciente y responder con el objeto creado", async () => {
    const mockPacientData = { name: "Juan", identification: 1065 };
    req.body = mockPacientData;

    // Configuramos el mock para que el "constructor" devuelva un objeto con save
    // y que ese save devuelva los datos del paciente
    const saveMock = jest.fn().mockResolvedValue(mockPacientData);
    Pacient.mockImplementation(() => ({
      save: saveMock,
    }));

    await addPacient(req, res);

    // Verificamos que se envió la información correcta
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining(mockPacientData),
    );
    // Opcional: verificar que save fue llamado
    expect(saveMock).toHaveBeenCalled();
  });

  // 2. Test para selectPacient
  test("selectPacient debería retornar una lista de pacientes", async () => {
    const mockList = [{ name: "Juan" }, { name: "Ana" }];
    Pacient.find.mockResolvedValue(mockList);

    await selectPacient(req, res);

    expect(res.json).toHaveBeenCalledWith(mockList);
  });

  // 3. Test para updatePacient (Caso Éxito)
  test("updatePacient debería actualizar y retornar el paciente", async () => {
    req.params.id = "123";
    req.body = { name: "Juan Actualizado" };
    Pacient.findByIdAndUpdate.mockResolvedValue({ _id: "123", ...req.body });

    await updatePacient(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Juan Actualizado" }),
    );
  });

  // 4. Test para findPacient (Caso No Encontrado)
  test("findPacient debería retornar 404 si el paciente no existe", async () => {
    req.params.id = "999";
    Pacient.findById.mockResolvedValue(null);

    await findPacient(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Paciente no encontrado",
    });
  });

  // 5. Test para deletePacient (Caso Éxito)
  test("deletePacient debería eliminar al paciente si existe", async () => {
    req.params.id = "123";
    // Simulamos que primero lo encuentra
    Pacient.findById.mockResolvedValue({ _id: "123" });
    // Simulamos la eliminación
    Pacient.findByIdAndDelete.mockResolvedValue(true);

    await deletePacient(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      response: "Paciente eliminado exitosamente.",
    });
  });

  // 6. Test de Error de Servidor (Catch block)
  test("selectPacient debería retornar 500 si ocurre una excepción", async () => {
    Pacient.find.mockRejectedValue(new Error("DB Error"));

    await selectPacient(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Error al consultar.");
  });
});
