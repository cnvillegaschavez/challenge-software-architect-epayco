# ePayco Frontend - Skeleton

Frontend skeleton para la plataforma de pagos electrónicos ePayco, desarrollado con Next.js 16, React 19 y TypeScript.

## 🏗️ Estructura del Proyecto

```
src/
├── app/                        # App Router de Next.js
│   ├── about-us/              # Página sobre nosotros
│   ├── api/                   # API routes
│   ├── auth/                  # Páginas de autenticación (login, register)
│   ├── help/                  # Centro de ayuda
│   ├── payments/              # Página de procesamiento de pagos
│   ├── profile/               # Perfil de usuario
│   ├── privacy/               # Política de privacidad
│   ├── terms-and-conditions/  # Términos y condiciones
│   ├── wallet/                # Wallet y transacciones
│   ├── layout.tsx             # Layout principal
│   └── page.tsx               # Página de inicio
│
├── components/                 # Componentes reutilizables
│   ├── custom/                # Componentes personalizados
│   ├── form/                  # Componentes de formularios
│   ├── layout/                # Componentes de layout (navbar, footer)
│   └── ui/                    # Componentes UI base (shadcn/ui)
│
├── features/                   # Features del negocio
│   ├── auth/                  # Autenticación
│   ├── help/                  # Centro de ayuda
│   ├── payment/               # Procesamiento de pagos
│   │   ├── components/        # Componentes de pagos
│   │   ├── hooks/             # Hooks personalizados
│   │   ├── services/          # Servicios de API
│   │   ├── stores/            # Estado global (zustand)
│   │   └── types/             # Tipos TypeScript
│   └── wallet/                # Wallet digital
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
│
├── core/                       # Configuración core
│   ├── config/                # Variables de entorno
│   ├── constants/             # Constantes globales
│   ├── hooks/                 # Hooks globales
│   └── lib/                   # Utilidades y helpers
│
└── types/                      # Tipos TypeScript globales
```

## 🚀 Tecnologías

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.1
- **TypeScript**: ^5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Authentication**: NextAuth.js
- **Data Fetching**: TanStack Query

## 📋 Prerequisitos

- Node.js 18+
- npm o yarn

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones
```

## 🏃 Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start

# Linting
npm run lint
```

## 🎨 Features Implementadas

### 1. Payment (Pagos)
- **Componentes**: PaymentForm
- **Tipos**: Payment, PaymentMethod, PaymentStatus
- **Servicios**: PaymentService (skeleton)
- Métodos de pago: Tarjetas, PSE, Transferencias, Wallet

### 2. Wallet
- **Componentes**: WalletBalance
- **Tipos**: Wallet, Transaction, TransactionType
- Gestión de balance y transacciones

### 3. Auth (Autenticación)
- Login y registro
- Integración con NextAuth.js

### 4. Help (Ayuda)
- FAQ con accordion
- Preguntas frecuentes sobre la plataforma

## 📝 Próximos Pasos (TODO)

### Backend Integration
- [ ] Implementar llamadas reales a las APIs
- [ ] Configurar endpoints en `payment.service.ts`
- [ ] Implementar manejo de errores
- [ ] Agregar interceptores de Axios

### Features
- [ ] Implementar hooks personalizados (usePayment, useWallet)
- [ ] Agregar gestión de estado con Zustand stores
- [ ] Implementar validaciones de formularios
- [ ] Agregar notificaciones con Sonner

### UI/UX
- [ ] Implementar loading states
- [ ] Agregar animaciones de transición
- [ ] Mejorar responsive design
- [ ] Agregar dark mode completo

### Security
- [ ] Implementar CSRF protection
- [ ] Agregar rate limiting
- [ ] Implementar encriptación de datos sensibles
- [ ] Configurar Content Security Policy

## 🔐 Variables de Entorno

```env
NEXT_PUBLIC_API_URL=         # URL de la API backend
NEXTAUTH_SECRET=             # Secret para NextAuth
NEXTAUTH_URL=                # URL de la aplicación
```

## 📁 Convenciones de Código

- **Componentes**: PascalCase (ej: `PaymentForm.tsx`)
- **Utilities**: camelCase (ej: `formatCurrency.ts`)
- **Types**: PascalCase (ej: `Payment`, `PaymentMethod`)
- **Hooks**: camelCase con prefijo "use" (ej: `usePayment`)
- **Services**: PascalCase con sufijo "Service" (ej: `PaymentService`)

## 🧩 Estructura de Features

Cada feature sigue la misma estructura:

```
feature-name/
├── components/     # Componentes UI específicos
├── hooks/          # Hooks personalizados
├── services/       # Lógica de API
├── stores/         # Estado global (zustand)
└── types/          # Tipos TypeScript
```

## 🤝 Contribución

Este es un skeleton base. Para extenderlo:

1. Implementa los servicios en `services/*.service.ts`
2. Agrega hooks personalizados en `hooks/`
3. Crea stores de Zustand cuando necesites estado compartido
4. Extiende los tipos según necesidades del negocio

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
