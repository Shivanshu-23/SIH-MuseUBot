from rasa_sdk import Action, Tracker, FormValidationAction
from rasa_sdk.events import SlotSet
from rasa_sdk.executor import CollectingDispatcher
from typing import Any, Text, Dict, List

class ActionCheckAvailability(Action):
    def name(self) -> str:
        return "action_check_availability"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict):
        date = tracker.get_slot('date')
        if date:
            dispatcher.utter_message(text=f"Tickets are available for {date}.")
        else:
            dispatcher.utter_message(text="Please provide a date for ticket booking.")
        return []

class ActionAskPayment(Action):
    def name(self) -> str:
        return "action_ask_payment"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict):
        dispatcher.utter_message(text="Please provide your payment details.")
        return []

class ActionProcessPayment(Action):
    def name(self) -> str:
        return "action_process_payment"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict):
        dispatcher.utter_message(text="Payment successful. Your ticket is booked!")
        return []

class ValidateBookTicketForm(FormValidationAction):
    def name(self) -> str:
        return "validate_book_ticket_form"

    async def required_slots(
        self,
        domain_slots: List[Text],
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Text]:
        return ["date", "time"]
