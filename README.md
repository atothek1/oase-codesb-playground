# react-playground-v3

Created with CodeSandbox

```ts
const states = createState({
    app() {
        return createState(
            "app",
            { name: "", version: "", environment: "" },
            {
                setName(state, action) {
                    if (state.name === action.payload) return state;
                    return { ...state, name: action.payload };
                },
                setVersion(state, action) {
                    if (state.version === action.payload) return state;
                    return { ...state, version: action.payload };
                },
                setEnvironment(state, action) {
                    if (state.environment === action.payload) return state;
                    return { ...state, environment: action.payload };
                }
            },
            {
                getName(state) {
                    return state.name;
                },
                getVersion(state) {
                    return state.version;
                },
                getEnvironment(state) {
                    return state.environment;
                }
            }
        );
    }
});
```

```ts
const { actions, selectors } = useState();
actions.app.setName("foo");
selectors.app.getName();

const { actions, selectors } = useState("app");
actions.setName("foo");
selectors.getName();

const { actions, selectors } = useSelectors();
actions.setName("foo");
selectors.getName();
```
