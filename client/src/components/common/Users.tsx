import { useAppContext } from "@/context/AppContext"
import { RemoteUser, USER_CONNECTION_STATUS } from "@/types/user"
import Avatar from "react-avatar"

function Users() {
    const { users } = useAppContext()

    return (
        <div className="flex min-h-[200px] flex-grow justify-center overflow-y-auto py-2">
            <div className="flex h-full w-full flex-wrap items-start gap-x-2 gap-y-6">
                {users.map((user) => {
                    return <User key={user.socketId} user={user} />
                })}
            </div>
        </div>
    )
}

const User = ({ user }: { user: RemoteUser }) => {
    const { username, status } = user
    const isProfessor = username.toLowerCase().includes("ta") // Check if username contains "TA"
    const title = `${username} - ${status === USER_CONNECTION_STATUS.ONLINE ? "online" : "offline"}${
        isProfessor ? " (Professor)" : ""
    }`

    return (
        <div
            className="relative flex w-[100px] flex-col items-center gap-2"
            title={title}
        >
            <div className="relative">
                <Avatar name={username} size="50" round={"12px"} title={title} />
                {isProfessor && (
                    <span
                        className="absolute top-0 left-0 text-xs bg-blue-600 text-white px-1 py-0.5 rounded"
                        style={{ transform: "translate(-50%, -50%)" }}
                    >
                        TA
                    </span>
                )}
            </div>
            <p className="line-clamp-2 max-w-full text-ellipsis break-words text-center">
                {username}
            </p>
            <div
                className={`absolute right-5 top-0 h-3 w-3 rounded-full ${
                    status === USER_CONNECTION_STATUS.ONLINE
                        ? "bg-green-500"
                        : "bg-danger"
                }`}
            ></div>
        </div>
    )
}

export default Users
