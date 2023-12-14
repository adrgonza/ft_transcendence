import asyncio
import websockets
import json

async def websocket_client():
    try:
        tournament_id = input("Enter Tournament ID: ")
        client_id = input("Enter Client ID: ")

        uri = f"ws://localhost:8001/ws/tournament/{tournament_id}/?client_id={client_id}"

        async with websockets.connect(uri) as websocket:
            print(f"Connected to {uri}")

            while True:
                command = input("Enter Command: ")
                data = input("Enter Data (JSON format): ")

                message = {
                    'command': command,
                    'data': json.loads(data)
                }
                await websocket.send(json.dumps(message))
                print(f"Sent message: {json.dumps(message)}")

                try:
                    response = await websocket.recv()
                    print("Received response:")
                    try:
                        response_data = json.loads(response)
                        formatted_response = json.dumps(response_data, indent=2)
                        print(formatted_response)

                        # Handle different response commands here
                        if response_data.get('command') == 'tournament_started':
                            print("Tournament has started!")

                    except json.JSONDecodeError:
                        print("Received non-JSON response.")

                except websockets.exceptions.ConnectionClosed:
                    print("WebSocket connection closed.")
                    break
                
    except KeyboardInterrupt:
        print("Manually interrupted. Exiting...")

if __name__ == "__main__":
    try:
        asyncio.get_event_loop().run_until_complete(websocket_client())
    except KeyboardInterrupt:
        print("Manually interrupted. Exiting...")
