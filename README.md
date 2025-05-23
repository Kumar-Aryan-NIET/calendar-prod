# Calendar Project

This project is a React-based calendar application built with Vite and Tailwind CSS. It provides a user-friendly calendar interface similar to Google Calendar, allowing users to view, add, edit, and delete events with persistence using localStorage.

## Features

- Display current month and year with a grid layout of all dates.
- Navigate between previous and next months.
- Highlight the current date dynamically.
- Display events loaded from a static JSON file.
- Visual representation of events on corresponding dates.
- Handle overlapping events with conflict warnings.
- Add, edit, and delete events with validation.
- Sidebar navigation with multiple menu items.
- Detailed event card overlay on event click.
- Routing with React Router.
- Responsive and accessible UI using Tailwind CSS.

# SnapSorts

![alt text](<Screenshot from 2025-05-23 06-29-05.png>) 

![alt text](<Screenshot from 2025-05-23 06-28-30.png>)

![alt text](<Screenshot from 2025-05-23 06-28-56.png>) 

![alt text](<Screenshot from 2025-05-23 06-28-41.png>) 

![alt text](<Screenshot from 2025-05-23 06-29-56.png>)



## Tech Stack

- React
- Vite
- Tailwind CSS
- date-fns (for date manipulation)
- React Router
- LocalStorage for event persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd calendar
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Project

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal) to view the application.

### Building for Production

To build the project for production:

```bash
npm run build
# or
yarn build
```

The output will be in the `dist` folder.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

## Usage

- Use the sidebar to navigate between different sections.
- Click on dates in the calendar to view or add events.
- Click on events to see detailed information.
- Add, edit, or delete events using the sidebar form.
- Conflicts and past event validations are handled with user notifications.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.
