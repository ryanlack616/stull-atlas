"""
Generate NCECA 2026 Countdown Checklist as a clean PDF.
"""
import re
from fpdf import FPDF

class NCECAPdf(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font('Helvetica', 'I', 8)
            self.set_text_color(120, 120, 120)
            self.cell(0, 6, 'NCECA 2026 -- Stull Atlas Countdown Checklist', align='R')
            self.ln(8)

    def footer(self):
        self.set_y(-15)
        self.set_font('Helvetica', 'I', 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f'Page {self.page_no()}/{{nb}}', align='C')

    def section_title(self, text):
        self.set_font('Helvetica', 'B', 14)
        self.set_text_color(30, 30, 80)
        self.cell(0, 10, text, new_x='LMARGIN', new_y='NEXT')
        self.set_draw_color(30, 30, 80)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(4)

    def subsection_title(self, text):
        self.set_font('Helvetica', 'B', 11)
        self.set_text_color(60, 60, 60)
        self.cell(0, 8, text, new_x='LMARGIN', new_y='NEXT')
        self.ln(2)

    def body_text(self, text, indent=0):
        self.set_font('Helvetica', '', 9)
        self.set_text_color(40, 40, 40)
        x = self.l_margin + indent
        self.set_x(x)
        self.multi_cell(self.w - self.r_margin - x, 5, text)

    def checkbox_item(self, text, checked=False, indent=0, bold_prefix=None):
        self.set_font('Helvetica', '', 9)
        self.set_text_color(40, 40, 40)
        x = self.l_margin + indent
        self.set_x(x)
        box = '[x]' if checked else '[  ]'
        if bold_prefix:
            self.cell(10, 5, box)
            self.set_font('Helvetica', 'B', 9)
            self.cell(self.get_string_width(bold_prefix) + 2, 5, bold_prefix)
            self.set_font('Helvetica', '', 9)
            remaining = text[len(bold_prefix):] if text.startswith(bold_prefix) else text
            self.multi_cell(0, 5, remaining)
        else:
            self.multi_cell(0, 5, f'{box}  {text}')

    def detail_line(self, text, indent=10):
        self.set_font('Helvetica', '', 8)
        self.set_text_color(90, 90, 90)
        x = self.l_margin + indent
        self.set_x(x)
        self.multi_cell(self.w - self.r_margin - x, 4.5, text)

    def blockquote(self, text):
        self.set_fill_color(240, 240, 245)
        self.set_font('Helvetica', 'I', 9)
        self.set_text_color(60, 60, 60)
        x = self.l_margin + 4
        self.set_x(x)
        self.multi_cell(self.w - self.r_margin - x - 4, 5, text, fill=True)
        self.ln(3)

    def table_row(self, cells, widths, bold=False, header=False):
        if header:
            self.set_font('Helvetica', 'B', 8)
            self.set_fill_color(30, 30, 80)
            self.set_text_color(255, 255, 255)
        elif bold:
            self.set_font('Helvetica', 'B', 9)
            self.set_text_color(30, 30, 80)
            self.set_fill_color(255, 255, 255)
        else:
            self.set_font('Helvetica', '', 8)
            self.set_text_color(40, 40, 40)
            self.set_fill_color(255, 255, 255)

        max_h = 5
        for i, cell in enumerate(cells):
            x = self.get_x()
            y = self.get_y()
            self.multi_cell(widths[i], 5, cell, border=1, fill=header, new_x='RIGHT', new_y='TOP', max_line_height=5)
            h = self.get_y() - y
            if h > max_h:
                max_h = h
            self.set_xy(x + widths[i], y)
        self.ln(max_h)


def build_pdf():
    pdf = NCECAPdf('P', 'mm', 'Letter')
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    # Title
    pdf.set_font('Helvetica', 'B', 22)
    pdf.set_text_color(30, 30, 80)
    pdf.cell(0, 14, 'NCECA 2026', align='C', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Helvetica', '', 12)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 8, 'Countdown Checklist -- Stull Atlas', align='C', new_x='LMARGIN', new_y='NEXT')
    pdf.ln(4)

    # Key info
    pdf.set_font('Helvetica', '', 10)
    pdf.set_text_color(40, 40, 40)
    info = [
        ('Conference', 'March 25-28, 2026 | Detroit, MI (Huntington Place)'),
        ('Exhibitor Setup', 'March 24 (Tuesday) 12:00-6:00 PM'),
        ('Resource Hall', 'March 25-27 (Wed-Fri) | Closed Saturday'),
        ('Today', 'February 9, 2026 | 44 days out'),
    ]
    for label, val in info:
        pdf.set_font('Helvetica', 'B', 9)
        pdf.cell(30, 5.5, label + ':')
        pdf.set_font('Helvetica', '', 9)
        pdf.cell(0, 5.5, val, new_x='LMARGIN', new_y='NEXT')
    pdf.ln(3)

    pdf.blockquote('Booth includes: 3 four-day rep passes, 6\' draped table, 2 chairs, wastebasket, ID signage, 8\' back drape, 3\' side drapes.')
    pdf.ln(2)

    # === WEEK 1 ===
    pdf.section_title('Week 1: Feb 9-15 (6.5 weeks out)')

    pdf.subsection_title('Print Orders (long lead time -- do first)')

    for item, details in [
        ('Business cards -- MOO Super Soft Touch, 18pt, 300 qty (~$115)', [
            'QR code -> stullatlas.app (same on every card)',
            'Finalize artwork from marketing/print/nceca-card.md',
        ]),
        ('Retractable banner -- 33"x80", with stand + carry case (~$150-250)', [
            '150 DPI, PDF/X-1a, screenshot of Explorer page',
            'Finalize artwork from marketing/print/booth-banner.md',
        ]),
        ('Journals -- Vistaprint Softy Classic Journal, black, 50 qty (~$130)', [
            'Front imprint: original 1912 Stull chart artwork',
            '80 lined pages, A6, elastic closure, no setup fee',
        ]),
        ('USB drives -- Metal mini style, 25 qty (~$50-75)', [
            'Custom logo imprint: Stull Atlas wordmark + stullatlas.app',
        ]),
        ('Small fabric bags -- Muslin drawstring pouches 3"x4", 25 qty (~$5-12)', [
            'Each bag gets: 1 USB drive + 1 business card',
        ]),
        ('Quarter-sheet flyers -- 6"x4" postcards, 600 qty (~$55)', [
            'Front: Logo, tagline, Explorer screenshot, QR code',
            'Back: Feature bullets, Studio Edition callout, contact info',
        ]),
    ]:
        pdf.checkbox_item(item, indent=2)
        for d in details:
            pdf.detail_line('- ' + d, indent=14)
        pdf.ln(1)

    pdf.subsection_title('Software')
    for item in [
        'Final Tauri build -- npm run tauri:build, verify .exe installs clean',
        'Test Studio Edition on a fresh Windows machine (VM or second PC)',
        'Verify offline data loads work (disconnect WiFi after install)',
    ]:
        pdf.checkbox_item(item, indent=2)
    pdf.ln(3)

    # === WEEK 2 ===
    pdf.section_title('Week 2: Feb 16-22 (5.5 weeks out)')

    pdf.subsection_title('Data & Backend')
    pdf.checkbox_item('Free-month flag: verified signups get Pro access Mar 15 - Apr 30', checked=True, indent=2)
    pdf.detail_line('- FREE_UNTIL date check in authStore.ts -- committed 1d4dff5', indent=14)
    pdf.ln(1)
    pdf.checkbox_item('Test signup -> email verification -> Pro features unlock flow', indent=2)
    pdf.checkbox_item('Set up custom SMTP in Supabase (3 emails/hr limit won\'t work)', indent=2)
    pdf.detail_line('- Resend free tier: 100 emails/day, easy setup', indent=14)
    pdf.ln(1)
    pdf.checkbox_item('Set up email templates (Welcome, nceca-followup, free-period-ending)', indent=2)

    pdf.subsection_title('USB Prep')
    for item in [
        'Flash script dry run: .\\scripts\\flash-usb.ps1 with 1 test USB',
        'Verify README.html renders correctly when opened from USB',
        'Confirm installer runs from USB (some drives are slow -- test)',
    ]:
        pdf.checkbox_item(item, indent=2)
    pdf.ln(3)

    # === WEEK 3 ===
    pdf.section_title('Week 3: Feb 23 - Mar 1 (4.5 weeks out)')

    pdf.subsection_title('Print Arrives (check tracking)')
    for item in [
        'Business cards received -- spot check QR code scans',
        'Quarter-sheet flyers -- check colors, QR, text accuracy',
        'Banner received -- unroll, check colors and text',
        'USB drives received -- test imprint quality',
        'Journals received -- check Stull chart print quality, elastic band',
        'Fabric bags received -- check size fits USB + card',
    ]:
        pdf.checkbox_item(item, indent=2)

    pdf.subsection_title('Flash USBs & Assemble Gift Bags')
    for item in [
        'Batch flash all 25 drives: .\\scripts\\flash-usb.ps1',
        'Spot check 3 random drives -- insert, run installer, verify app',
        'Assemble gift bags: 1 USB + 1 business card per fabric pouch',
    ]:
        pdf.checkbox_item(item, indent=2)

    pdf.subsection_title('Web Deploy')
    for item in [
        'Final web deploy to stullatlas.app -- .\\scripts\\deploy.ps1',
        'Smoke test: sign up -> verify email -> confirm Pro features',
        'Check Plausible analytics is tracking',
    ]:
        pdf.checkbox_item(item, indent=2)
    pdf.ln(3)

    # === WEEK 4 ===
    pdf.section_title('Week 4: Mar 2-8 (3.5 weeks out)')

    pdf.subsection_title('Booth Logistics')
    for item in [
        'Confirm booth assignment / floor plan from NCECA',
        'Driving from Howell (~60 min) -- leave by 7 AM each day',
        'Optional: book 1 hotel night near Huntington Place',
        'Research parking at Huntington Place (prepay if possible)',
        'Booth furnishing -- table + 2 chairs included; monitor? power strip?',
        'Laptop for live demo (charged, offline data works, good screen)',
        'Extension cord + power strip',
    ]:
        pdf.checkbox_item(item, indent=2)

    pdf.subsection_title('Demo Prep')
    pdf.checkbox_item('Practice the 5 talking points (marketing/copy/nceca-2026.md)', indent=2)
    pdf.checkbox_item('Pre-load 3 demo scenarios on laptop:', indent=2)
    for d in [
        '1. Explorer with Cone 6 glazes visible',
        '2. Similarity search: "Leach 4321"',
        '3. Triaxial blend between two interesting glazes',
    ]:
        pdf.detail_line(d, indent=14)
    pdf.checkbox_item('Demo laptop has both Web + Studio installed', indent=2)
    pdf.ln(3)

    # === WEEK 5 ===
    pdf.section_title('Week 5: Mar 9-15 (2.5 weeks out)')

    pdf.subsection_title('Dry Run')
    for item in [
        'Full signup test: new email -> verify -> sign in -> confirm Pro',
        'Test on phone (mobile Safari / Chrome)',
        'Verify SMTP delivery speed (should be < 30 sec)',
        'Deploy final web build to stullatlas.app',
    ]:
        pdf.checkbox_item(item, indent=2)
    pdf.ln(3)

    # === WEEK 6 ===
    pdf.section_title('Week 6: Mar 16-22 (1 week out)')

    pdf.subsection_title('Pack Checklist')
    for item in [
        'Retractable banner + stand + carry case',
        'Business cards (all 300)',
        'Journals (all 50)',
        'Quarter-sheet flyers (all 600)',
        'USB gift bags (all 25)',
        'Demo laptop + charger',
        'Extension cord / power strip',
        'Phone charger',
        'Tape, zip ties, small toolkit',
        'Water bottle, snacks',
    ]:
        pdf.checkbox_item(item, indent=2)
    pdf.checkbox_item('Test stullatlas.app from phone one more time', indent=2)
    pdf.checkbox_item('Charge everything', indent=2)
    pdf.ln(3)

    # === CONFERENCE ===
    pdf.section_title('Conference: Mar 24-28')

    pdf.subsection_title('Day 0 -- Setup (Tue Mar 24, 12:00-6:00 PM)')
    for item in [
        'Exhibitor check-in / badge printing (10 AM-6 PM)',
        'Set up booth: banner, table, laptop, cards/journals/USBs',
        'Test WiFi at venue (have offline fallback ready)',
        'Open Explorer on laptop, Cone 6 view ready',
    ]:
        pdf.checkbox_item(item, indent=2)

    pdf.subsection_title('Resource Hall Days (Wed-Fri, Mar 25-27)')
    pdf.body_text('Hours: Wed & Thu 9 AM - 5 PM, Fri 9 AM - 4:30 PM', indent=2)
    pdf.ln(2)
    for item in [
        'Restock cards, journals, flyers, USB gift bags at booth',
        'Track handout counts (rough count)',
        'Note feature requests or common questions',
        'Post 1 photo/update to social media',
    ]:
        pdf.checkbox_item(item, indent=2)

    pdf.subsection_title('Fri Mar 27 -- Teardown (4:30-10:30 PM)')
    for item in [
        'Pack everything',
        'Note remaining card/journal/flyer/USB counts',
        'Send follow-up email blast within 48 hours',
    ]:
        pdf.checkbox_item(item, indent=2)
    pdf.ln(3)

    # === POST-CONFERENCE ===
    pdf.section_title('Post-Conference: Mar 30 - Apr 3')
    for item in [
        'Send NCECA follow-up email to new signups',
        'Review Plausible analytics -- traffic spike?',
        'Check Supabase -- how many new verified signups?',
        'Plan conversion: free period ends Apr 30 -- send pricing email',
        'Write up lessons learned',
    ]:
        pdf.checkbox_item(item, indent=2)
    pdf.ln(3)

    # === BUDGET ===
    pdf.section_title('Budget Summary')

    pdf.body_text('Howell, MI -> Huntington Place, Detroit: ~60 mi / 1 hr each way. Plan to commute daily; hotel optional.')
    pdf.ln(4)

    widths = [70, 30, 90]
    pdf.table_row(['Item', 'Est. Cost', 'Vendor / Notes'], widths, header=True)
    rows = [
        ('Booth fee', '$1,900', 'NCECA exhibitor registration'),
        ('Booth staff (weekend)', '$320', ''),
        ('Journals (50, Stull chart)', '$130', 'Vistaprint Softy Classic Journal, black'),
        ('Business cards (300)', '$115', 'MOO Super 18pt Soft Touch'),
        ('Retractable banner', '$110', 'Vistaprint Standard vinyl'),
        ('USB drives (25, metal mini)', '$50-75', 'Custom logo imprint'),
        ('Fabric pouches (25)', '$5-12', 'Muslin drawstring, Amazon'),
        ('Quarter-sheet flyers (600)', '$55', 'Vistaprint postcards, 14pt UV gloss'),
        ('Gas (4 days)', '$120', '120 mi/day @ $0.25/mi'),
        ('Parking', '$100', 'Huntington Place, $25/day x 4'),
        ('Hotel (optional)', '$0-200', '0-1 nights'),
        ('Misc', '$150', 'Food, tolls, extras'),
    ]
    for r in rows:
        pdf.table_row(list(r), widths)

    pdf.table_row(['TOTAL', '~$2,955-3,187', ''], widths, bold=True)

    # === DISTRIBUTION STRATEGY ===
    pdf.ln(6)
    pdf.section_title('Swag Distribution Strategy')

    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 80)
    pdf.cell(0, 7, 'Tier 1 -- Everyone who stops by:', new_x='LMARGIN', new_y='NEXT')
    pdf.body_text('Journal (Stull chart cover) + flyer + business card', indent=4)
    pdf.ln(3)

    pdf.set_font('Helvetica', 'B', 10)
    pdf.set_text_color(30, 30, 80)
    pdf.cell(0, 7, 'Tier 2 -- Engaged prospects (educators, studio owners):', new_x='LMARGIN', new_y='NEXT')
    pdf.body_text('Everything above + fabric gift bag with USB drive and business card inside', indent=4)
    pdf.ln(3)

    # Save
    out = r'C:\rje\dev\stull-atlas\docs\NCECA-2026-Checklist.pdf'
    pdf.output(out)
    print(f'PDF saved: {out}')

if __name__ == '__main__':
    build_pdf()
