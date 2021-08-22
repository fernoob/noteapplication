const ListNotes = require("./ListNotes")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new ListNotes.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
