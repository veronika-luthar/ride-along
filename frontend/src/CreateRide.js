export default function Form() {
    return (
        <>
            <form>
                <label for="title">Title</label>
                <input type="text" id="title" required></input>
                <label for="date">Date</label>
                <input type="date" id="date" required></input>
                <label for="time">Time</label>
                <input type="time" id="time" required></input>
                <label for="location">Start location</label>
                <input type="text" id="location" required></input>
                <label for="description">Description</label>
                <textarea id="description"></textarea>
                <label for="max-attendance">Max attendance</label>
                <input type="number" id="max-attendance"></input>
                <input type="submit" value="Create ride"></input>
            </form>
        </>
    ); 
}