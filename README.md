# Employee Management Application

Angular + NgRx + Angular Material employee management application for the Exelynt Frontend Developer Assignment.

## Features
- Responsive employee table with Name, Email, Mobile and Country
- Search employee by ID with loading, success, empty/not-found and error states
- Add, edit and delete employee records
- Delete confirmation dialog
- Reactive Forms with field-level validation
- Country API integration
- Employee REST API integration
- NgRx Store, Effects and Entity Adapter
- Separate list/detail/search/mutation state handling
- Smart/container screens with reusable standalone UI components
- Angular Material UI
- OnPush change detection
- Selector-based state access
- Safe edit-form subscription with `takeUntilDestroyed`
- Unit tests for services, reducers, selectors, effects and components

## APIs
Countries:
`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country`

Employees:
`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee`

## Run
```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Test
```bash
npm test
```

Coverage:
```bash
npm run test:coverage
```

## Build
```bash
npm run build
```

## Architecture
- `core/` - models and API services
- `store/` - NgRx actions, reducers, effects and selectors
- `features/` - employee list, search and form screens
- `shared/` - reusable loading, empty, error and confirmation components

Mutation effects use `concatMap` so requests are not accidentally cancelled by a later action. Entity updates use `upsertOne` so an update response cannot silently disappear when the entity is not already cached. Employee search has its own state so a previous selected employee cannot be displayed after a failed search.
