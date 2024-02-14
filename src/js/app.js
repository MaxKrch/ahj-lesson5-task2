import popoverToggle from "./popover";
import registerEvent from "./eventsFuncs";

registerEvent(".toggle-button__button", "click", () => {
	popoverToggle(event, ".toggle-button");
});
