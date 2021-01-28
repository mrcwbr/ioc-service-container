import { TestApi } from "./TestApi";
import { inject } from "../src/index";

export class TestService {
    @inject
    private readonly testApi!: TestApi

    save() {
        this.testApi.save();
    }
}
