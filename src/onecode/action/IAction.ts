/**
 * Interface reprsenting a user action
 * 
 * @interface IAction
 */
interface IAction {
    redo: () => void;
    undo: () => void;
}