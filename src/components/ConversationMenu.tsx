import { GameDataContext } from "point-click-components";
import { useContext } from "react";


export const ConversationMenu = () => {
    const { dispatch, gameState } = useContext(GameDataContext)
    const { conversations, currentConversationId } = gameState;
    const currentConversation = conversations.find(c => c.id === currentConversationId);
    const currentBranch = currentConversation?.currentBranch ?? currentConversation?.defaultBranch ?? '';
    const branch = currentConversation && currentConversation.branches[currentBranch]


    if (!branch) {
        return <section>ERR</section>
    }

    return <section>
        {branch.choices.filter(choice => !choice.disabled).map((choice, index) => (
            <div key={index}>
                <button

                    onClick={() => {
                        dispatch({ type: 'CONVERSATION-CHOICE', choice })
                    }}>{choice.text}</button>
            </div>
        ))}
    </section>
}