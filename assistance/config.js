axios.defaults.withCredentials = true; // Si necesitas enviar cookies o credenciales
axios.defaults.headers.common['Origin'] = 'https://bmax.tail6edceb.ts.net';

new Vue({
    el: "#app",
    data: {
      isLoggedIn: false,
      username: "",
      password: "",
      errorMessage: "",
      user: {},
      currentShift: null,
      currentDate: new Date().toISOString().split("T")[0],
      formattedTime: new Date().toLocaleTimeString("es-CL"),
      justificationMessage: "",
      justificationText: "",
      records: [],
      apiUrl: "https://bmax.tail6edceb.ts.net", // URL base de la API
      showDeleteModal: false,
      deleteReason: "",
      selectedRecord: null,
    },
    methods: {
      async login() {
        try {
          const response = await axios.post(`${this.apiUrl}/api/login`, {
            username: this.username,
            password: this.password,
          });

          if (!response.data.success) {
            throw new Error(response.data.message || "Credenciales inválidas");
          }

          if (response.data.status === "inactive") {
            throw new Error("Este usuario está inactivo y no es posible realizar inicio de sesión");
          }

          this.user = response.data.user;
          this.isLoggedIn = true;

          // Guardar el estado de autenticación en localStorage
          localStorage.setItem("user", JSON.stringify(this.user));
          localStorage.setItem("isLoggedIn", true);

          this.loadUserData();
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
      logout() {
        this.isLoggedIn = false;
        this.user = {};
        this.currentShift = null;
        this.records = [];

        // Eliminar el estado de autenticación de localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
      },
      async loadUserData() {
        try {
          // Obtener todos los turnos
          const shiftsResponse = await.get(`${this.apiUrl}/api/shifts`);
          const allShifts = shiftsResponse.data;

          // Filtrar turnos por userId
          const userShifts = allShifts.filter((shift) => shift.user_id === this.user.id);

          // Filtrar turnos por fecha actual
          const today = new Date().toISOString().split("T")[0];
          const todayShifts = userShifts.filter((shift) => {
            const shiftDate = new Date(shift.date).toISOString().split("T")[0];
            return shiftDate === today;
          });

          // Buscar el turno actual
          const now = new Date();
          this.currentShift = todayShifts.find((shift) => {
            const shiftStart = new Date(`${today}T${shift.start_time}`);
            const shiftEnd = new Date(`${today}T${shift.end_time}`);
            return now >= shiftStart && now <= shiftEnd;
          });

          // Cargar registros de asistencia
          const recordsResponse = await axios.get(`${this.apiUrl}/api/attendance/${this.user.id}`, {
            params: { start: today, end: today },
          });
          this.records = recordsResponse.data;
        } catch (error) {
          console.error("Error cargando datos del usuario:", error);
        }
      },
      async checkIn() {
        if (!this.currentShift) {
          alert("No hay turno asignado.");
          return;
        }

        const now = new Date();
        const shiftStart = new Date(`${this.currentDate}T${this.currentShift.start_time}`);
        const fifteenMinutesBefore = new Date(shiftStart.getTime() - 15 * 60000);

        if (now < fifteenMinutesBefore) {
          alert("No puedes marcar entrada hasta 15 minutos antes del inicio del turno.");
          return;
        }

        try {
          await axios.post(`${this.apiUrl}/api/attendance/check-in`, {
            userId: this.user.id,
            shiftId: this.currentShift.id,
            shiftName: this.currentShift.name, // Incluye el nombre del turno
          });
          alert("Entrada registrada correctamente.");
          this.loadUserData();
        } catch (error) {
          alert(error.message);
        }
      },
      async checkOut() {
        if (!this.currentShift) {
          alert("No hay turno asignado.");
          return;
        }

        const now = new Date();
        const shiftStart = new Date(`${this.currentDate}T${this.currentShift.start_time}`);
        const fifteenMinutesBefore = new Date(shiftStart.getTime() - 15 * 60000);

        if (now < fifteenMinutesBefore) {
          alert("No puedes marcar salida hasta 15 minutos antes del inicio del turno.");
          return;
        }

        try {
          await axios.post(`${this.apiUrl}/api/attendance/check-out`, {
            userId: this.user.id,
            shiftId: this.currentShift.id,
            shiftName: this.currentShift.name, // Incluye el nombre del turno
          });
          alert("Salida registrada correctamente.");
          this.loadUserData();
        } catch (error) {
          alert(error.message);
        }
      },
      async submitJustification() {
        if (!this.justificationText.trim()) {
          alert("Ingrese una justificación válida.");
          return;
        }
        try {
          await axios.post(`${this.apiUrl}/api/attendance`, {
            user_id: this.user.id,
            date: this.currentDate,
            justification: this.justificationText,
            status: "justified",
            shift_id: this.currentShift?.id,
            shift_name: this.currentShift?.name, // Incluye el nombre del turno
          });
          alert("Justificación enviada correctamente.");
          this.justificationText = "";
          this.loadUserData();
        } catch (error) {
          alert(error.message);
        }
      },
      openDeleteModal(record) {
        this.selectedRecord = record;
        this.showDeleteModal = true;
      },
      async submitDeleteRequest() {
        if (!this.deleteReason.trim()) {
          alert("Ingrese una razón válida.");
          return;
        }

        const newTicket = {
          title: `Requiero solicitud de Eliminación y Justificación del día ${this.safeFormatDate(this.selectedRecord.date)}`,
          description: `Soy ${this.user.username} y necesito eliminar la marca del día ${this.safeFormatDate(this.selectedRecord.date)}. Razón: ${this.deleteReason}`,
          type: 'general',
          requester: this.user.username,
          related_module: 'Registro de Asistencia',
          status: 'pending',
        };

        try {
          await axios.post(`${this.apiUrl}/api/tickets`, newTicket);
          alert("Solicitud de eliminación enviada correctamente.");
          this.showDeleteModal = false;
          this.deleteReason = "";
        } catch (error) {
          alert(error.message);
        }
      },
      safeFormatDate(dateString) {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("es-CL");
      },
      safeFormatTime(dateTimeString) {
        if (!dateTimeString) return "-";
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
      },
    },
    computed: {
      statusLabels() {
        return {
          pending: "Pendiente",
          present: "Presente",
          absent: "Ausente",
          justified: "Justificado",
          late: "Con Retraso",
          "early-exit": "Salida Temprana",
          completed: "Completado Manual",
          vacation: "Vacaciones",
        };
      },
      shiftCardColor() {
        if (this.isShiftLate) return 'bg-orange-100';
        if (this.isShiftAbsent) return 'bg-red-100';
        return 'bg-white';
      },
      isShiftPending() {
        if (!this.currentShift) return false;

        const now = new Date();
        const shiftStart = new Date(`${this.currentDate}T${this.currentShift.start_time}`);
        const fifteenMinutesBefore = new Date(shiftStart.getTime() - 15 * 60000);

        return now < fifteenMinutesBefore;
      },
      isShiftLate() {
        if (!this.currentShift) return false;

        const now = new Date();
        const shiftStart = new Date(`${this.currentDate}T${this.currentShift.start_time}`);
        const fifteenMinutesAfter = new Date(shiftStart.getTime() + 15 * 60000);

        return now > fifteenMinutesAfter && now <= new Date(shiftStart.getTime() + 30 * 60000);
      },
      isShiftAbsent() {
        if (!this.currentShift) return false;

        const now = new Date();
        const shiftStart = new Date(`${this.currentDate}T${this.currentShift.start_time}`);
        const thirtyMinutesAfter = new Date(shiftStart.getTime() + 30 * 60000);

        return now > thirtyMinutesAfter;
      },
      showJustificationCard() {
        return this.isShiftAbsent;
      },
    },
    mounted() {
      // Verificar si hay un usuario autenticado en localStorage
      const savedUser = localStorage.getItem("user");
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if (savedUser && isLoggedIn) {
        this.user = JSON.parse(savedUser);
        this.isLoggedIn = true;
        this.loadUserData();
      }

      setInterval(() => {
        this.formattedTime = new Date().toLocaleTimeString("es-CL");
      }, 1000);
    },
  });
